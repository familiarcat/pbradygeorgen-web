// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { ContactInformation, Resume, Education, Degree, Company, Accomplishment, School, Experience, Skill, Engagement, Summary } = initSchema(schema);

export {
  ContactInformation,
  Resume,
  Education,
  Degree,
  Company,
  Accomplishment,
  School,
  Experience,
  Skill,
  Engagement,
  Summary
};