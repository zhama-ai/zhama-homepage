import { DEFAULT_REPLY_TIME } from '../../../shared/contact-fields.mjs';

export const contactContent = {
  zh: {
    title: '联系我们',
    sections: { enquiry: '咨询内容', contact: '联系方式' },
    form: {
      title: { label: '咨询主题', placeholder: '请输入咨询主题' },
      content: { label: '咨询内容', placeholder: '请描述您的问题、建议或需求' },
      nickname: { label: '昵称（选填）', placeholder: '希望我们如何称呼您' },
      contact: { label: '联系方式', placeholder: '请输入邮箱或手机号' },
      expectedReplyTime: { label: '期望回复时间', defaultValue: DEFAULT_REPLY_TIME, clear: '清除时间', period: '时段', morning: '上午', afternoon: '下午', previousMonth: '上个月', nextMonth: '下个月', done: '完成' },
      submit: '提交信息', submitting: '正在提交',
    },
    confirmation: { title: '信息已提交', message: '我们会尽快与您联系。', confirm: '确定' },
    failure: '提交失败，请稍后重试，或发送邮件至 contact@zhama.com。',
    timeout: '尚未确认提交结果。请重试，系统会核对本次提交，避免重复接收。',
    validation: { title: '请填写咨询主题。', content: '请填写咨询内容。', contact: '请填写联系方式。', tooLong: '内容过长，请缩短后提交。' },
    noScript: '请通过邮件联系我们：',
    info: {
      email: { title: '邮箱联系' }, phone: { title: '电话联系' },
      response: { title: '响应时间', time: '我们通常在24小时内回复' },
    },
    plans: { community: '社区版咨询', subscription: '订阅版咨询', enterprise: '企业版咨询' },
  },
  en: {
    title: 'Contact Us',
    sections: { enquiry: 'Enquiry', contact: 'Contact details' },
    form: {
      title: { label: 'Subject', placeholder: 'What would you like to discuss?' },
      content: { label: 'Message', placeholder: 'Describe your question, feedback, or requirements.' },
      nickname: { label: 'Nickname (optional)', placeholder: 'How should we address you?' },
      contact: { label: 'Contact details', placeholder: 'Enter an email or phone number' },
      expectedReplyTime: { label: 'Preferred reply time', defaultValue: 'As soon as possible', clear: 'Clear time', period: 'Time of day', morning: 'Morning', afternoon: 'Afternoon', previousMonth: 'Previous month', nextMonth: 'Next month', done: 'Done' },
      submit: 'Send message', submitting: 'Sending',
    },
    confirmation: { title: 'Message submitted', message: 'We’ll contact you as soon as possible.', confirm: 'OK' },
    failure: 'Submission failed. Try again later, or email contact@zhama.com directly.',
    timeout: 'The submission result is not confirmed yet. Retry to check this submission without creating a duplicate.',
    validation: { title: 'Enter a subject.', content: 'Enter a message.', contact: 'Enter your contact details.', tooLong: 'Shorten this value before sending.' },
    noScript: 'Contact us by email:',
    info: {
      email: { title: 'Email' }, phone: { title: 'Phone' },
      response: { title: 'Response time', time: 'We typically respond within 24 hours' },
    },
    plans: { community: 'Community enquiry', subscription: 'Subscription enquiry', enterprise: 'Enterprise enquiry' },
  },
};
