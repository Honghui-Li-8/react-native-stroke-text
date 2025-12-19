#!/usr/bin/env node

/**
 * Codegen Validation Script
 * 
 * Validates that the native component spec can be parsed by React Native's codegen
 * without errors. This catches issues like using generic `number` types instead of
 * specific types like `Int32`, `Double`, or `Float`.
 */

const fs = require('fs');
const path = require('path');

const COMPONENT_FILE = path.join(__dirname, '../src/StrokeTextViewNativeComponent.ts');
const PACKAGE_JSON = path.join(__dirname, '../package.json');

function main() {
  console.log('🔍 Validating codegen schema...\n');

  // Check if component file exists
  if (!fs.existsSync(COMPONENT_FILE)) {
    console.error(`❌ Error: Component file not found at ${COMPONENT_FILE}`);
    process.exit(1);
  }

  // Read package.json to get codegen config
  let packageJson;
  try {
    packageJson = JSON.parse(fs.readFileSync(PACKAGE_JSON, 'utf8'));
  } catch (error) {
    console.error(`❌ Error: Could not read package.json: ${error.message}`);
    process.exit(1);
  }

  const codegenConfig = packageJson['react-native']?.codegenConfig;
  if (!codegenConfig) {
    console.error('❌ Error: No codegenConfig found in package.json');
    process.exit(1);
  }

  // Try to load React Native's codegen TypeScript parser
  let TypeScriptParser;
  try {
    // Try to find @react-native/codegen parser
    // It might be in node_modules or react-native's node_modules
    const parserPath = require.resolve('@react-native/codegen/lib/parsers/typescript/parser.js', {
      paths: [
        path.join(__dirname, '../node_modules'),
        path.join(__dirname, '../node_modules/react-native/node_modules'),
      ]
    });
    const ParserModule = require(parserPath);
    // TypeScriptParser is exported as a named export
    TypeScriptParser = ParserModule.TypeScriptParser || ParserModule.default || ParserModule;
    
    if (typeof TypeScriptParser !== 'function') {
      throw new Error(`TypeScriptParser is not a constructor. Found type: ${typeof TypeScriptParser}`);
    }
  } catch (error) {
    console.error('❌ Error: Could not find @react-native/codegen parser');
    console.error('   Make sure @react-native/codegen is installed: yarn add -D @react-native/codegen');
    console.error(`   Original error: ${error.message}`);
    process.exit(1);
  }

  // Read the component file
  let fileContent;
  try {
    fileContent = fs.readFileSync(COMPONENT_FILE, 'utf8');
  } catch (error) {
    console.error(`❌ Error: Could not read component file: ${error.message}`);
    process.exit(1);
  }

  // Create parser instance and try to parse the file
  try {
    const parser = new TypeScriptParser();
    const schema = parser.parseString(fileContent, COMPONENT_FILE);
    
    // If we get here, parsing was successful
    console.log('✅ Codegen schema validation passed!');
    console.log(`   Component: ${codegenConfig.name}`);
    console.log(`   Type: ${codegenConfig.type}`);
    console.log(`   File: ${path.relative(process.cwd(), COMPONENT_FILE)}`);
    
    if (schema && schema.components) {
      const componentName = Object.keys(schema.components)[0];
      if (componentName) {
        const component = schema.components[componentName];
        const propCount = component.props ? Object.keys(component.props).length : 0;
        console.log(`   Props: ${propCount} properties defined`);
      }
    }
    
    console.log('');
    process.exit(0);
  } catch (error) {
    console.error('❌ Codegen schema validation failed!\n');
    console.error('Error details:');
    console.error(`   ${error.message}`);
    
    if (error.stack) {
      // Extract useful parts of the stack trace
      const stackLines = error.stack.split('\n');
      const relevantLines = stackLines
        .filter(line => 
          line.includes(COMPONENT_FILE) || 
          line.includes('componentsUtils') ||
          line.includes('parser.js')
        )
        .slice(0, 5);
      
      if (relevantLines.length > 0) {
        console.error('\nStack trace (relevant lines):');
        relevantLines.forEach(line => {
          console.error(`   ${line.trim()}`);
        });
      }
    }
    
    console.error('\n💡 Common issues:');
    console.error('   - Using generic "number" type instead of Int32, Double, or Float');
    console.error('   - Missing required type imports from react-native');
    console.error('   - Invalid prop type definitions');
    console.error('');
    
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = main;
