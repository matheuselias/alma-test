import { countries } from '@/utils/countries'

export const schema = {
  type: 'object',
  properties: {
    personalInfo: {
      type: 'object',
      title: 'Personal Information',
      properties: {
        firstName: { type: 'string', title: 'First Name' },
        lastName: { type: 'string', title: 'Last Name' },
        email: { type: 'string', title: 'Email' },
        country: {
          type: 'string',
          title: 'Country of Citizenship',
          enum: countries
        },
        linkedin: {
          type: 'string',
          title: 'LinkedIn / Personal Website URL'
        }
      }
    },
    visaCategories: {
      type: 'object',
      title: 'Visa Categories of Interest',
      properties: {
        o1: { type: 'boolean', title: 'O-1' },
        eb1a: { type: 'boolean', title: 'EB-1A' },
        eb2niw: { type: 'boolean', title: 'EB-2 NIW' },
        dontKnow: { type: 'boolean', title: "I don't know" }
      },
      anyOf: [
        { required: ['o1'] },
        { required: ['eb1a'] },
        { required: ['eb2niw'] },
        { required: ['dontKnow'] }
      ]
    },
    resume: {
      type: 'string',
      title: 'Resume/CV'
    },
    helpDescription: {
      type: 'string',
      title: 'How can we help you?'
    }
  }
}

export const uiSchema = {
  type: 'VerticalLayout',
  elements: [
    {
      type: 'Group',
      label: '',
      elements: [
        {
          type: 'Control',
          scope: '#/properties/personalInfo/properties/firstName',
          label: '',
          options: {
            placeholder: 'First Name'
          }
        },
        {
          type: 'Control',
          scope: '#/properties/personalInfo/properties/lastName',
          label: '',
          options: {
            placeholder: 'Last Name'
          }
        },
        {
          type: 'Control',
          scope: '#/properties/personalInfo/properties/email',
          label: '',
          options: {
            placeholder: 'Email'
          }
        },
        {
          type: 'Control',
          scope: '#/properties/personalInfo/properties/country',
          label: '',
          options: {
            placeholder: 'Country of Citizenship'
          }
        },
        {
          type: 'Control',
          scope: '#/properties/personalInfo/properties/linkedin',
          label: '',
          options: {
            placeholder: 'LinkedIn / Personal Website URL'
          }
        }
      ]
    },
    {
      type: 'Group',
      label: 'Visa Categories of Interest',
      elements: [
        {
          type: 'Control',
          scope: '#/properties/visaCategories/properties/o1',
          label: 'O-1'
        },
        {
          type: 'Control',
          scope: '#/properties/visaCategories/properties/eb1a',
          label: 'EB-1A'
        },
        {
          type: 'Control',
          scope: '#/properties/visaCategories/properties/eb2niw',
          label: 'EB-2 NIW'
        },
        {
          type: 'Control',
          scope: '#/properties/visaCategories/properties/dontKnow',
          label: "I don't know"
        }
      ]
    },
    {
      type: 'Control',
      scope: '#/properties/resume',
      label: '',
      options: {
        custom: 'file-upload'
      }
    },
    {
      type: 'Control',
      scope: '#/properties/helpDescription',
      label: '',
      options: {
        multi: true,
        placeholder:
          'What is your current status and when does it expire? What is your past immigration history? Are you looking for long-term permanent residency or short-term employment visa or both? Are there any timeline considerations?'
      }
    }
  ]
}
