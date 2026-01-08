# Copyright (c) Meta Platforms, Inc. and affiliates.
#
# This source code is licensed under the MIT license found in the
# LICENSE file in the root directory of this source tree.

cmake_minimum_required(VERSION 3.13)
set(CMAKE_VERBOSE_MAKEFILE on)

project(react_codegen_StrokeTextView)

if(NOT COMMAND target_compile_reactnative_options)
  if(NOT DEFINED REACT_COMMON_DIR)
    if(NOT DEFINED REACT_NATIVE_DIR)
      set(_RN_DIR_SCOPED "${CMAKE_CURRENT_LIST_DIR}/../../../../../..//react-native")
      set(_RN_DIR_UNSCOPED "${CMAKE_CURRENT_LIST_DIR}/../../../../..//react-native")
      if(EXISTS "${_RN_DIR_SCOPED}/ReactCommon/cmake-utils/react-native-flags.cmake")
        set(REACT_NATIVE_DIR "${_RN_DIR_SCOPED}")
      elseif(EXISTS "${_RN_DIR_UNSCOPED}/ReactCommon/cmake-utils/react-native-flags.cmake")
        set(REACT_NATIVE_DIR "${_RN_DIR_UNSCOPED}")
      endif()
    endif()
    if(DEFINED REACT_NATIVE_DIR)
      set(REACT_COMMON_DIR "${REACT_NATIVE_DIR}/ReactCommon")
    endif()
  endif()

  if(DEFINED REACT_COMMON_DIR AND EXISTS "${REACT_COMMON_DIR}/cmake-utils/react-native-flags.cmake")
    include("${REACT_COMMON_DIR}/cmake-utils/react-native-flags.cmake")
  endif()
endif()

if(NOT COMMAND target_compile_reactnative_options)
  function(target_compile_reactnative_options target_name scope)
    # Fallback no-op for build environments that don't expose RN cmake utilities.
  endfunction()
endif()

file(GLOB react_codegen_SRCS CONFIGURE_DEPENDS *.cpp react/renderer/components/StrokeTextView/*.cpp)

add_library(
  react_codegen_StrokeTextView
  OBJECT
  ${react_codegen_SRCS}
)

target_include_directories(react_codegen_StrokeTextView PUBLIC . react/renderer/components/StrokeTextView)

target_link_libraries(
  react_codegen_StrokeTextView
  fbjni
  jsi
  # We need to link different libraries based on whether we are building rncore or not, that's necessary
  # because we want to break a circular dependency between react_codegen_rncore and reactnative
  reactnative
)

target_compile_reactnative_options(react_codegen_StrokeTextView PRIVATE)
