import { TreeNode, CommonOption } from "./"

export function getNodeByKey(data: TreeNode[], key: string|number, props: { value: string; children: string }, tree?): CommonOption {

  //
  if (tree?.getNode && key) {
    return tree.getNode(key)?.data
  }

  for (const node of data) {
    if (node[props.value] === key) return node;
    if (node[props.children]?.length) {
      const targetNode = getNodeByKey(node[props.children], key, props);
      if (targetNode) return targetNode;
    }
  }
  return undefined;
}
