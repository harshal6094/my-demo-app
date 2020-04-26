export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  websiteURL?: string;
  roles: Roles;
  accounts?: Array<string>;
}

export interface Roles {
  subscriber?: boolean;
  admin?: boolean;
}

export interface Account {
  name: string;
  account_currency?: string;
  account_slug: string;
  adwords_factor?: number;
  countryCode: string;
  facebookFactor?: number;
  form_settings?: FormSettings;
  gtm_container_id?: string;
  isDemo: boolean;
  googleReviewLink?: string;
  text_msg_templates?: Array<string>;
  twilio_from?: string;
  twilio_messaging_sid?: string; // Check whether it is actually used
  location?: string;
  menu?: Array<Menu>;
  /*
   * This should also use the Staff interface
   * once necessary changes are made in the code
   */
  primaryContact?: PrimaryContact;
  staff?: Array<Staff>;
  socialMediaLinks?: SocialMediaLinks;

  // Check which should be compulsory; url or website?
  url?: string;
  website?: string;
}

export interface FormSettings {
  email: string;
  hubspot_id: string;
  hubspot_form_id: string;
}

export interface Menu {
  access: string; // This should be boolean
  link: string;
  menuitem: string;
}

// Remove once Staff interface is put in
export interface PrimaryContact {
  contactNo: string;
  name: string;
  email: string;
}

export interface Staff {
  docEmail: string;
  docName: string;
  docPhone: string;
}

export interface SocialMediaLinks {
  facebookLink: string;
  instagramLink: string;
  youtubeLink: string;
}

/*
 * Create a Contact interface
 * Create an Appointment interface
 * Create a Form interface
 * Create a Notification interface?
 * Think of other interfaces to add
 */

export interface Provider {
  fullname: string;
  email: string;
  phone?: string;
  degree: string;
}
