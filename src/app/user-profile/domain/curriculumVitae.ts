import {Certification} from "./certification";
import {Course} from "./course";
import {Language} from "./language";
import {Project} from "./project";
import {Publication} from "./publication";
import {Education} from "./education";
import {Volunteer} from "./volunteer";
import {Work} from "./work";
import {Profile} from "./profile";
import Entity from "../../core/domain/entity";

export class CurriculumVitae extends Entity {

    public certifications: Array<Certification> = [];
    public courses: Array<Course> = [];
    public languages: Array<Language> = [];
    public projects: Array<Project> = [];
    public publications: Array<Publication> = [];
    public educations: Array<Education> = [];
    public volunteers: Array<Volunteer> = [];
    public works: Array<Work> = [];

    constructor(value: Partial<CurriculumVitae> = {}) {
      super();
      Object.assign(this, value);
      if (this.certifications)
          this.certifications = this.certifications.map(certification => new Certification(certification));
      if (this.courses)
          this.courses = this.courses.map(course => new Course(course));
      if (this.languages)
          this.languages = this.languages.map(language => new Language(language));
      if (this.projects)
          this.projects = this.projects.map(project => new Project(project));
      if (this.publications)
          this.publications = this.publications.map(publication => new Publication(publication));
      if (this.educations)
          this.educations = this.educations.map(education => new Education(education));
      if (this.volunteers)
          this.volunteers = this.volunteers.map(volunteer => new Volunteer(volunteer));
      if (this.works)
          this.works = this.works.map(work => new Work(work));
    }

}
