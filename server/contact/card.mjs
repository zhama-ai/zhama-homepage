import { DEFAULT_REPLY_TIME, IMMEDIATE_REPLY_TIME, leadContact } from '../../shared/contact-fields.mjs';
import { leadJourney } from '../../shared/contact-attribution.mjs';

const plain = content => ({ tag: 'plain_text', content });
const text = (content, { id, size = 'normal', color = 'default' } = {}) => ({
  tag: 'div', ...(id ? { element_id: id } : {}),
  text: { ...plain(content), text_size: size, text_color: color },
});
const label = content => text(content, { size: 'notation', color: 'grey' });
const columns = items => ({
  tag: 'column_set', flex_mode: 'none', horizontal_spacing: '16px',
  columns: items.map(elements => ({ tag: 'column', width: 'weighted', weight: 1, vertical_spacing: '4px', elements })),
});

export function buildLeadCard(lead) {
  const immediate = lead.expectedReplyTime === IMMEDIATE_REPLY_TIME;
  return {
    schema: '2.0',
    config: {
      enable_forward: true, update_multi: true, width_mode: 'default',
      summary: { content: `${immediate ? '即时联系 · ' : ''}官网咨询：${lead.title}` },
    },
    header: {
      template: 'default', title: plain('官网新线索'),
      icon: { tag: 'standard_icon', token: 'browser-mac_outlined', color: 'blue' }, padding: '16px 20px 8px 20px',
      ...(immediate ? { text_tag_list: [{ tag: 'text_tag', text: plain('即时联系'), color: 'orange' }] } : {}),
    },
    body: {
      padding: '12px 20px 20px 44px', vertical_spacing: '8px',
      elements: [
        columns([
          [label('线索来源'), text('官网', { id: 'lead_source' })],
          [label('期望回复时间'), text(lead.expectedReplyTime || DEFAULT_REPLY_TIME, { id: 'lead_reply_time', color: immediate ? 'orange' : 'default' })],
        ]),
        columns([
          [label('联系方式'), text(leadContact(lead), { id: 'lead_contact' })],
          ...(leadJourney(lead) ? [[label('来源路径'), text(leadJourney(lead), { id: 'lead_journey', size: 'notation' })]] : []),
        ]),
        label('线索主题'),
        text(lead.title, { id: 'lead_subject' }),
        label('线索内容'),
        text(lead.content, { id: 'lead_message' }),
      ],
    },
  };
}
