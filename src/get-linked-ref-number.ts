import { PageIdentity } from '@logseq/libs/dist/LSPlugin.user'

export const getNumberofLinkedReferences = async (page: PageIdentity) => {
  if (!logseq.settings!.indicateUnread) return ''

  let linkedRefs = await logseq.DB.q(`(and [[inbox]] (not (page [[inbox]])))`)
  if (!linkedRefs) return 0
  linkedRefs = linkedRefs.filter((block) => block.content.includes(page))
  return linkedRefs.length > 0 ? `*` : ''
}
