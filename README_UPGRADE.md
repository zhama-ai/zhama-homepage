# Vue 3 + TypeScript 升级指南

本项目已从Vue 3 JavaScript升级到Vue 3 + TypeScript。以下是升级的主要变更和注意事项。

## 升级内容

1. 添加了TypeScript支持
   - 安装了TypeScript及相关依赖
   - 添加了TypeScript配置文件 (tsconfig.json, tsconfig.node.json)
   - 添加了Vue组件类型声明 (shims-vue.d.ts)

2. 文件转换
   - 将主要的JavaScript文件(.js)转换为TypeScript文件(.ts)
   - 将Vue组件中的`<script setup>`更新为`<script setup lang="ts">`
   - 为变量添加了TypeScript类型注解

3. 构建工具更新
   - 更新了Vite配置以支持TypeScript
   - 添加了类型检查命令 `npm run type-check`
   - 构建过程中添加了类型检查步骤

## 使用指南

### 开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 类型检查
npm run type-check
```

### 构建

```bash
# 构建生产版本(包含类型检查)
npm run build
```

## 向组件添加TypeScript

要为现有Vue组件添加TypeScript支持，需要进行以下更改：

1. 将 `<script setup>` 改为 `<script setup lang="ts">`
2. 为响应式变量添加类型注解，例如：
   ```typescript
   const count = ref<number>(0);
   const user = ref<User | null>(null);
   ```

3. 定义接口或类型：
   ```typescript
   interface User {
     id: number;
     name: string;
     email: string;
   }
   ```

4. 为prop添加类型：
   ```typescript
   const props = defineProps<{
     title: string;
     items: Array<Item>;
     optional?: boolean;
   }>();
   ```

5. 为emit事件添加类型：
   ```typescript
   const emit = defineEmits<{
     (e: 'update', value: string): void;
     (e: 'delete', id: number): void;
   }>();
   ```

## 常见问题及解决方案

### TypeScript配置问题

如果遇到类似以下的错误：
```
failed to resolve "extends":"@vue/tsconfig/tsconfig.node.json" in /path/to/tsconfig.node.json
```

解决方案：
1. 检查@vue/tsconfig包中实际可用的配置文件：
   ```bash
   npm explore @vue/tsconfig -- ls -la
   ```

2. 根据实际可用的配置文件修改tsconfig.node.json：
   ```json
   {
     "extends": "@vue/tsconfig/tsconfig.json",
     "include": ["vite.config.*"],
     "compilerOptions": {
       "composite": true,
       "types": ["node"],
       "noEmit": false
     }
   }
   ```

3. 从tsconfig.json中移除对tsconfig.node.json的引用：
   ```json
   // 移除以下内容
   "references": [{ "path": "./tsconfig.node.json" }]
   ```

4. 分离Vite环境类型声明到单独的文件(src/vite-env.d.ts)：
   ```typescript
   /// <reference types="vite/client" />
   ```

## 注意事项

1. 在引入类型时，使用`import type`语法以避免类型导入混淆：
   ```typescript
   import type { RouteRecordRaw } from 'vue-router';
   ```

2. 未使用的变量会导致TypeScript错误，可以使用下划线前缀来表示此变量是有意不使用的：
   ```typescript
   function handler(value: string, _unused: number) {
     console.log(value);
   }
   ```

3. 将第三方库中的导入添加到`tsconfig.json`的`types`字段中。

4. 关于@vue/tsconfig包的使用：
   - 当前项目使用的@vue/tsconfig版本(0.5.1)中包含以下配置文件：
     - tsconfig.json - 基本配置
     - tsconfig.dom.json - 针对DOM环境的配置
     - tsconfig.lib.json - 针对库开发的配置
   - 需要注意不同版本的@vue/tsconfig包可能有不同的配置文件，使用时需检查实际可用的配置

## 可能的后续优化

1. 为所有组件添加TypeScript支持
2. 使用更严格的TypeScript配置
3. 添加ESLint支持TypeScript的规则 