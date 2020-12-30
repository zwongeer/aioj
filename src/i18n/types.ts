import * as ErrorMessages from 'app/errors';

export type InternationalizationLanguage = {
  home: string;
  about: string;
  forum: string;
  login: string;
  register: string;
  logout: string;
  error: string;
  warning: string;
  success: string;
  reply_success: string;
  delete_success: string;
  update_success: string;
  admin: string;
  username: string;
  password: string;
  repeat_password: string;
  ok: string;
  cancel: string;
  not_found: string;
  description: string;
  submit: string;
  submissions: string;
  edit: string;
  discuss: string;
  operations: string;
  reply_warning: string;
  reply_placeholder: string;

  no_files: string;
  no_posts: string;
  no_regions: string;
  no_problems: string;
  region: string;
  user: string;
  regions: string;
  problems: string;
  create_new_problem: string;
  create_new_region: string;
  create_new_post: string;
  create: string;
  reply: string;
  post_title: string;
  post_content: string;
  post: string;
  region_url: string;
  region_title: string;
  region_desc: string;
  problem_title: string;
  delete: string;
  my_files: string;
  upload_tips: string;
  upload: string;
  my_accounts: string;

  confirm_logout: string;
  confirm_delete: string;
  confirm_delete_file: string;
  confirm_delete_comment: string;
  confirm_delete_post: string;
  confirm_delete_region: string;
} & { [key in typeof ErrorMessages[keyof typeof ErrorMessages]]: string };
