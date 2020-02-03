import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {CurriculumStoreService} from "../../service/curriculum-store.service";
import {GlobalAppService} from "../../../core/commons/service/global-app.service";
import {Router} from "@angular/router";
import {CurriculumVitae} from "../../domain/curriculumVitae";
import {Work} from "../../domain/work";
import {Publication} from "../../domain/publication";
import {Project} from "../../domain/project";
import {Language} from "../../domain/language";
import {Course} from "../../domain/course";
import {Education} from "../../domain/education";
import {Certification} from "../../domain/certification";
import {SnackbarService} from "../../../core/service/snackbar.service";

@Component({
  selector: 'app-curriculum',
  templateUrl: './curriculum.component.html',
  styleUrls: ['./curriculum.component.scss']
})
export class CurriculumComponent implements OnInit {

  loading = true;

  curriculum: CurriculumVitae = null;

  curriculumFormGroup: FormGroup;

  constructor(private fb: FormBuilder,
              private cvStore: CurriculumStoreService,
              private messageService: GlobalAppService,
              private router: Router,
              private cd: ChangeDetectorRef,
              private snackbarService: SnackbarService
  ) {
    this.curriculumFormGroup = this.fb.group({
      workArray: this.fb.array([]),
      certificationArray: this.fb.array([]),
      courseArray: this.fb.array([]),
      languageArray: this.fb.array([]),
      educationArray: this.fb.array([]),
      projectArray: this.fb.array([]),
      publicationArray: this.fb.array([])
    });
  }

  ngOnInit() {
    this.cvStore.getCurriculumVitae()
      .subscribe(curriculum => {
        this.curriculum = curriculum;
        console.log(this.curriculum);
        this.setWorks(this.curriculum.works);
        this.setCertifications(this.curriculum.certifications);
        this.setCourses(this.curriculum.courses);
        this.setLanguages(this.curriculum.languages);
        this.setEducations(this.curriculum.educations);
        this.setProjects(this.curriculum.projects);
        this.setPublications(this.curriculum.publications);
        this.loading = false;
        this.cd.markForCheck();
      });

  }

  setWorks(works: Work[]) {
    const workFGs = works.map(work =>
      this.fb.group({
          occupation: work.occupation,
          description: work.description,
          company: work.company,
          workHere: work.workHere,
          startDate: new Date(work.startDate),
          endDate: new Date(work.endDate)
        }
      ));
    const workFormArray = this.fb.array(workFGs);
    this.curriculumFormGroup.setControl('workArray', workFormArray);
  }

  setCertifications(certifications: Certification[]) {
    const certificationFGs = certifications.map(certification => this.fb.group({
        name: certification.name,
        certificationAuthority: certification.certificationAuthority,
        certificationURL: certification.certificationURL,
        startDate: new Date(certification.startDate),
        endDate: new Date(certification.endDate)
      }
    ));
    const certificationFormArray = this.fb.array(certificationFGs);
    this.curriculumFormGroup.setControl('certificationArray', certificationFormArray);
  }

  setEducations(educations: Education[]) {
    const educationFGs = educations.map(education => this.fb.group({
      university: education.university,
      description: education.description,
      title: education.title,
      academic: education.academic,
      activities: education.activities,
      startDate: new Date(education.startDate),
      endDate: new Date(education.endDate)
    }));
    const educationFormArray = this.fb.array(educationFGs);
    this.curriculumFormGroup.setControl('educationArray', educationFormArray);
  }


  setProjects(projects: Project[]) {
    const projectFGs = projects.map(project => this.fb.group({
      name: project.name,
      description: project.description,
      occupation: project.occupation,
      projectURL: project.projectURL,
      workNow: project.workNow,
      startDate: new Date(project.startDate),
      endDate: new Date(project.endDate)
    }));
    const projectFormArray = this.fb.array(projectFGs);
    this.curriculumFormGroup.setControl('projectArray', projectFormArray);
  }


  setPublications(publications: Publication[]) {
    const publicationFGs = publications.map(publication => this.fb.group({
      description: publication.description,
      publicationURL: publication.publicationURL,
      title: publication.title,
      publicationDate: new Date(publication.publicationDate)
    }));
    const publicationFormArray = this.fb.array(publicationFGs);
    this.curriculumFormGroup.setControl('publicationArray', publicationFormArray);
  }

  setCourses(courses: Course[]) {
    const courseFGs = courses.map(course => this.fb.group(course));
    const courseFormArray = this.fb.array(courseFGs);
    this.curriculumFormGroup.setControl('courseArray', courseFormArray);
  }

  setLanguages(languages: Language[]) {
    const languageFGs = languages.map(language => this.fb.group(language));
    const languageFormArray = this.fb.array(languageFGs);
    this.curriculumFormGroup.setControl('languageArray', languageFormArray);
  }


  formToEntity(form: FormGroup): CurriculumVitae {
    const formValue = form.value;
    const works: Array<Work> = [];
    formValue.workArray.forEach(work => {
      works.push(new Work({
        occupation: work.occupation,
        description: work.description,
        company: work.company,
        workHere: work.workHere,
        startDate: work.startDate.getTime(),
        endDate: work.endDate.getTime()
      }));
    });
    const certifications: Array<Certification> = [];
    formValue.certificationArray.forEach(certification => {
      certifications.push(new Certification({
        name: certification.name,
        certificationAuthority: certification.certificationAuthority,
        certificationURL: certification.certificationURL,
        startDate: certification.startDate.getTime(),
        endDate: certification.endDate.getTime()
      }));
    });
    const educations: Array<Education> = [];
    formValue.educationArray.forEach(education => {
      educations.push(new Education({
        university: education.university,
        description: education.description,
        title: education.title,
        academic: education.academic,
        activities: education.activities,
        startDate: education.startDate.getTime(),
        endDate: education.endDate.getTime()
      }));
    });
    const projects: Array<Project> = [];
    formValue.projectArray.forEach(project => {
      projects.push(new Project({
        name: project.name,
        description: project.description,
        occupation: project.occupation,
        projectURL: project.projectURL,
        workNow: project.workNow,
        startDate: project.startDate.getTime(),
        endDate: project.endDate.getTime()
      }));
    });
    const publications: Array<Publication> = [];
    formValue.publicationArray.forEach(publication => {
      publications.push(new Publication({
        description: publication.description,
        publicationURL: publication.publicationURL,
        title: publication.title,
        publicationDate: publication.publicationDate.getTime()
      }));
    });

    return new CurriculumVitae({
      id: this.curriculum.id,
      works: works,
      certifications: certifications,
      courses: formValue.courseArray,
      languages: formValue.languageArray,
      educations: educations,
      projects: projects,
      publications: publications
    });
  }

  onSubmit(event) {
    event.preventDefault();
    this.curriculum = this.formToEntity(this.curriculumFormGroup);
    this.cvStore.save(this.curriculum).subscribe(
      curriculum => {
        this.snackbarService.show({
          title: "Guardado",
          body: "Se ha guardado el curriculum correctamente",
          type: "success"
        });
      },
      error => {
        this.snackbarService.show({
          title: "Error:",
          body: 'No sé ha podido guardar el perfil. ' + error.message,
          type: "success"
        });
      }
    );
    event.preventDefault();
  }


  goBack() {
    this.router.navigate(['']);
  }

  get certificationArray(): FormArray {
    return this.curriculumFormGroup.get('certificationArray') as FormArray;
  };

  addCertification() {
    const certification = new Certification();
    this.certificationArray.push(this.fb.group(
      {
        name: certification.name,
        certificationAuthority: certification.certificationAuthority,
        certificationURL: certification.certificationURL,
        startDate: new Date(certification.startDate),
        endDate: new Date(certification.endDate)
      }));
  }

  removeCertification(i: number) {
    this.certificationArray.removeAt(i);
  }

  get courseArray(): FormArray {
    return this.curriculumFormGroup.get('courseArray') as FormArray;
  };

  addCourse() {
    this.courseArray.push(this.fb.group(new Course()));
  }

  removeCourse(i: number) {
    this.courseArray.removeAt(i);
  }

  get educationArray(): FormArray {
    return this.curriculumFormGroup.get('educationArray') as FormArray;
  };

  addEducation() {
    const education = new Education();
    this.educationArray.push(this.fb.group(
      {
        university: education.university,
        description: education.description,
        title: education.title,
        academic: education.academic,
        activities: education.activities,
        startDate: new Date(education.startDate),
        endDate: new Date(education.endDate)
      }));
  }

  removeEducation(i: number) {
    this.educationArray.removeAt(i);
  }

  get languageArray(): FormArray {
    return this.curriculumFormGroup.get('languageArray') as FormArray;
  };

  addLanguage() {
    this.languageArray.push(this.fb.group(new Language()));
  }

  removeLanguage(i: number) {
    this.languageArray.removeAt(i);
  }

  get projectArray(): FormArray {
    return this.curriculumFormGroup.get('projectArray') as FormArray;
  };

  addProject() {
    const project = new Project();
    this.projectArray.push(this.fb.group(
      {
        name: project.name,
        description: project.description,
        occupation: project.occupation,
        projectURL: project.projectURL,
        workNow: project.workNow,
        startDate: new Date(project.startDate),
        endDate: new Date(project.endDate)
      }
    ));
  }

  removeProject(i: number) {
    this.projectArray.removeAt(i);
  }

  get publicationArray(): FormArray {
    return this.curriculumFormGroup.get('publicationArray') as FormArray;
  };

  addPublication() {
    const publication = new Publication();
    this.publicationArray.push(this.fb.group(
      {
        description: publication.description,
        publicationURL: publication.publicationURL,
        title: publication.title,
        publicationDate: new Date(publication.publicationDate)
      }
    ));
  }

  removePublication(i: number) {
    this.publicationArray.removeAt(i);
  }

  get workArray(): FormArray {
    return this.curriculumFormGroup.get('workArray') as FormArray;
  };

  addWork() {
    const work = new Work();
    this.workArray.push(this.fb.group(
      {
        occupation: work.occupation,
        description: work.description,
        company: work.company,
        workHere: work.workHere,
        startDate: new Date(work.startDate),
        endDate: new Date(work.endDate)
      }
    ));
  }

  removeWork(i: number) {
    this.workArray.removeAt(i);
  }

}
