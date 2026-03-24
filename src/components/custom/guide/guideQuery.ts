import { ContentBlock } from "@/components/custom/project-detail/projectQuery";
const qs = require('qs')

export const guideQuery = qs.stringify({
  populate: {
    blocks: {populate: '*'}
  }
}, {
  encodeValuesOnly: true,
});

export interface GuideData {
  contentBlocks: ContentBlock[];
}