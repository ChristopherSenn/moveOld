import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { UniversityService } from './study-abroad/university/university.service';
import { McBreadcrumbsModule } from 'ngx-breadcrumbs';

import { Injectable } from '@angular/core';

import { AppComponent } from './app.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { AppRoutingModule } from './/app-routing.module';
import { HomeComponent } from './home/home.component';
import { InternshipComponent } from './internship/internship.component';
import { StudyAbroadComponent } from './study-abroad/study-abroad.component';
import { ProfileComponent } from './profile/profile.component';
import { FooterComponent } from './footer/footer.component';
import { ProfileUserComponent } from './profile/profile-user/profile-user.component';
import { ProfileApplicationComponent } from './profile/profile-application/profile-application.component';
import { ProfileContactComponent } from './profile/profile-contact/profile-contact.component';
import { ProfileNavComponent } from './profile/profile-nav/profile-nav.component';
import { MapComponent } from './study-abroad/map/map.component';
import { UniversityComponent } from './study-abroad/university/university.component';
import { UniversityNavComponent } from './study-abroad/university/university-nav/university-nav.component';
import { UniversityGeneralComponent } from './study-abroad/university/university-general/university-general.component';
import { UniversityConsiderComponent } from './study-abroad/university/university-consider/university-consider.component';
import { UniversityExperiencesComponent } from './study-abroad/university/university-experiences/university-experiences.component';
import { UniversityCoursesComponent } from './study-abroad/university/university-courses/university-courses.component';
// tslint:disable-next-line:max-line-length
import { UniversityExperienceDetailComponent } from './study-abroad/university/university-experience-detail/university-experience-detail.component';
import { UniversityCourseDetailComponent } from './study-abroad/university/university-course-detail/university-course-detail.component';
import { UniversityDataService } from '../assets/Data/university-data.service';
import { StudentService } from './profile/student.service';
import { ExperiencesBoxesComponent } from './study-abroad/university/university-experiences/experiences-boxes/experiences-boxes.component';
import { AuthModule } from './auth/auth.module';
import { CourseComponent } from './study-abroad/university/university-courses/course/course.component';
import { FilterComponent } from './filter/filter.component';
import { SearchbarComponent } from './filter/searchbar/searchbar.component';
import { DndModule } from 'ng2-dnd';
import { MapboxComponent } from './study-abroad/map/mapbox/mapbox.component';
import { ProfileProgressComponent } from './profile/profile-progress/profile-progress.component';
import { PopupComponent } from './home/popup/popup.component';





@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    HomeComponent,
    InternshipComponent,
    StudyAbroadComponent,
    ProfileComponent,
    FooterComponent,
    ProfileUserComponent,
    ProfileApplicationComponent,
    ProfileContactComponent,
    ProfileNavComponent,
    MapComponent,
    UniversityComponent,
    UniversityNavComponent,
    UniversityGeneralComponent,
    UniversityConsiderComponent,
    UniversityExperiencesComponent,
    UniversityCoursesComponent,
    UniversityExperienceDetailComponent,
    UniversityCourseDetailComponent,
    UniversityCourseDetailComponent,
    ExperiencesBoxesComponent,
    CourseComponent,
    FilterComponent,
    SearchbarComponent,
    MapboxComponent,
    ProfileProgressComponent,
    PopupComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      UniversityDataService, { dataEncapsulation: false }
    ),
    AuthModule,
    McBreadcrumbsModule.forRoot(),
    DndModule.forRoot()

  ],
  providers: [
    UniversityService,
    StudentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
