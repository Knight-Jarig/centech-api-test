export interface MDCCmsPage {
  id: number;
  identifier: string;
  title: string;
  page_layout: string;
  meta_title: string;
  meta_keywords: string;
  meta_description: string;
  content_heading: string;
  content: string;
  creation_time: string;
  update_time: string;
  sort_order: string;
  layout_update_xml: string;
  custom_theme: string;
  active: boolean;
}
