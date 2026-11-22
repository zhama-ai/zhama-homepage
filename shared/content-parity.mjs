/** Compare business structure across translations without comparing translated wording. */
export function marketingStructure(document) {
  const result = { sections: [], headings: { h1: 0, h2: 0, h3: 0 }, terms: 0, definitions: 0, values: 0, reasons: 0 };
  const attribute = (node, name) => node.attrs?.find(item => item.name === name)?.value;
  const classes = node => (attribute(node, 'class') || '').split(/\s+/);
  const visit = (node, inMain = false, inReasons = false) => {
    inMain ||= node.tagName === 'main';
    inReasons ||= classes(node).includes('industry-value-why-reasons');
    if (inMain) {
      if (node.tagName === 'section') result.sections.push(attribute(node, 'id') || '');
      if (Object.hasOwn(result.headings, node.tagName)) result.headings[node.tagName]++;
      if (node.tagName === 'dt') result.terms++;
      if (node.tagName === 'dd') result.definitions++;
      if (classes(node).includes('industry-value-result')) result.values++;
      if (inReasons && node.tagName === 'li') result.reasons++;
    }
    for (const child of node.childNodes || []) visit(child, inMain, inReasons);
  };
  visit(document);
  return result;
}
