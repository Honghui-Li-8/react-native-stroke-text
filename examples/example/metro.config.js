// Learn more https://docs.expo.dev/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');
const fs = require('fs');

const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, '../..');
const packageRoot = path.resolve(monorepoRoot, 'packages/stroke-text');

const config = getDefaultConfig(projectRoot);

// Add the parent directory to watchFolders so Metro can resolve the local package
config.watchFolders = [projectRoot, monorepoRoot];

// Ensure Metro can resolve the local package
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(monorepoRoot, 'node_modules'),
];

// Explicitly resolve the local package
config.resolver.extraNodeModules = {
  '@charmy.tech/react-native-stroke-text': packageRoot,
};

// Custom resolver to prefer source files
const originalResolveRequest = config.resolver.resolveRequest;
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === '@charmy.tech/react-native-stroke-text') {
    // Prefer source file
    const sourceFile = path.join(packageRoot, 'src', 'index.tsx');
    if (fs.existsSync(sourceFile)) {
      return {
        type: 'sourceFile',
        filePath: sourceFile,
      };
    }
  }
  
  // For sub-imports like './StrokeTextViewNativeComponent'
  if (moduleName.includes('StrokeTextViewNativeComponent')) {
    const sourceFile = path.join(packageRoot, 'src', 'StrokeTextViewNativeComponent.ts');
    if (fs.existsSync(sourceFile)) {
      return {
        type: 'sourceFile',
        filePath: sourceFile,
      };
    }
  }
  
  // Use default resolver for other modules
  if (originalResolveRequest) {
    return originalResolveRequest(context, moduleName, platform);
  }
  
  // Fallback
  return context.resolveRequest(context, moduleName, platform);
};

// Ensure TypeScript files are resolved
if (!config.resolver.sourceExts.includes('ts')) {
  config.resolver.sourceExts.push('ts');
}
if (!config.resolver.sourceExts.includes('tsx')) {
  config.resolver.sourceExts.push('tsx');
}

module.exports = config;

