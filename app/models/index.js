// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Resume, Summary, Education, School, Experience, Degree, Engagement, Company, Skill, Accomplishment } = initSchema(schema);

export {
  Resume,
  Summary,
  Education,
  School,
  Experience,
  Degree,
  Engagement,
  Company,
  Skill,
  Accomplishment
};