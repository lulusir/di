import { Constructor } from './interface';

/**
 * todo
 * 构建一个依赖图
 * - 插入图，每个节点为一个类
 * - 判断是否有循环依赖
 * - 判断当前类是否有循环依赖，并给出提示
 */
export class DependencyGraph {
  graph: Map<Constructor, Constructor[]> = new Map();
}
