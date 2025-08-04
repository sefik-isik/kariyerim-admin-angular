import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UpdatePasswordComponent } from './components/updatePassword/updatePassword.component';
import { ExpirationGuard } from './guards/expiration.guard';
import { LoginGuard } from './guards/login.guard';
import { StatusGuard } from './guards/status.guard';
import { AllUserComponent } from './pages/allUser/allUser/allUser.component';
import { AllUserDeletedListTab } from './pages/allUser/allUser/allUserDeletedListTab';
import { AllUserListTab } from './pages/allUser/allUser/allUserListTab';
import { CityComponent } from './pages/city/city/city.component';
import { CityListTab } from './pages/city/city/cityListTab';
import { CompanyUserComponent } from './pages/companyUser/companyUser/companyUser.component';
import { CompanyUserListTab } from './pages/companyUser/companyUser/companyUserListTab';
import { CompanyUserAddressComponent } from './pages/companyUserAddress/companyUserAddress/companyUserAddress.component';
import { CompanyUserAddressListTab } from './pages/companyUserAddress/companyUserAddress/companyUserAddressListTab';
import { CompanyUserAdvertDeletedListTab } from './pages/companyUserAdvert/companyUserAdvert/companyUserAdvertDeletedListTab';
import { CompanyUserAdvertListTab } from './pages/companyUserAdvert/companyUserAdvert/companyUserAdvertListTab';
import { CompanyUserDepartmentComponent } from './pages/companyUserDepartment/companyUserDepartment/companyUserDepartment.component';
import { CompanyUserDepartmentListTab } from './pages/companyUserDepartment/companyUserDepartment/companyUserDepartmentListTab';
import { CompanyUserFileComponent } from './pages/companyUserFile/companyUserFile/companyUserFile.component';
import { CompanyUserFileDeletedListTab } from './pages/companyUserFile/companyUserFile/companyUserFileDeletedListTab';
import { CompanyUserFileListTab } from './pages/companyUserFile/companyUserFile/companyUserFileListTab';
import { CompanyUserImageComponent } from './pages/companyUserImage/companyUserImage/companyUserImage.component';
import { CompanyUserImageListTab } from './pages/companyUserImage/companyUserImage/companyUserImageListTab';
import { CompanyUserImageSlideTab } from './pages/companyUserImage/companyUserImage/companyUserImageSlideTab';
import { CountryComponent } from './pages/country/country/country.component';
import { CountryListTab } from './pages/country/country/countryListTab';
import { DriverLicenceComponent } from './pages/driverlicence/driverLicence/driverLicence.component';
import { DriverLicenceListTab } from './pages/driverlicence/driverLicence/driverLicenceListTab';
import { LanguageComponent } from './pages/language/language/language.component';
import { LanguageListTab } from './pages/language/language/languageListTab';
import { LanguageLevelComponent } from './pages/languageLevel/languageLevel/languageLevel.component';
import { LanguageLevelListTab } from './pages/languageLevel/languageLevel/languageLevelListTab';
import { UniversityImageSlideTab } from './pages/universityImage/universityImage/universityImageSlideTab';
import { RegisterCompanyUserComponent } from './components/registerCompanyUser/registerCompanyUser.component';
import { RegisterPersonelUserComponent } from './components/registerPersonelUser/registerPersonelUser.component';
import { CityDeletedListTab } from './pages/city/city/cityDeletedListTab';
import { CompanyUserDeletedListTab } from './pages/companyUser/companyUser/companyUserDeletedListTab';
import { CompanyUserAddressDeletedListTab } from './pages/companyUserAddress/companyUserAddress/companyUserAddressDeletedListTab';
import { CompanyUserAdvertComponent } from './pages/companyUserAdvert/companyUserAdvert/companyUserAdvert.component';
import { CompanyUserAdvertCityComponent } from './pages/companyUserAdvertCity/companyUserAdvertCity/companyUserAdvertCity.component';
import { CompanyUserAdvertCityDeletedListTab } from './pages/companyUserAdvertCity/companyUserAdvertCity/companyUserAdvertCityDeletedListTab';
import { CompanyUserAdvertCityListTab } from './pages/companyUserAdvertCity/companyUserAdvertCity/companyUserAdvertCityListTab';
import { CompanyUserAdvertJobDescriptionComponent } from './pages/companyUserAdvertJobDescription/companyUserAdvertJobDescription/companyUserAdvertJobDescription.component';
import { CompanyUserAdvertJobDescriptionDeletedListTab } from './pages/companyUserAdvertJobDescription/companyUserAdvertJobDescription/companyUserAdvertJobDescriptionDeletedListTab';
import { CompanyUserAdvertJobDescriptionListTab } from './pages/companyUserAdvertJobDescription/companyUserAdvertJobDescription/companyUserAdvertJobDescriptionListTab';
import { CompanyUserDepartmentDeletedListTab } from './pages/companyUserDepartment/companyUserDepartment/companyUserDepartmentDeletedListTab';
import { CompanyUserImageDeletedListTab } from './pages/companyUserImage/companyUserImage/companyUserImageDeletedListTab';
import { CountComponent } from './pages/count/count/count.component';
import { CountListTab } from './pages/count/count/countListTab';
import { CountryDeletedListTab } from './pages/country/country/countryDeletedListTab';
import { UniversityDepartmentComponent } from './pages/universityDepartment/universityDepartment/universityDepartment.component';
import { UniversityDepartmentDeletedListTab } from './pages/universityDepartment/universityDepartment/universityDepartmentDeletedListTab';
import { UniversityDepartmentListTab } from './pages/universityDepartment/universityDepartment/universityDepartmentListTab';
import { UniversityDepartmentDescriptionDeletedListTab } from './pages/universityDepartmentDescription/universityDepartmentDescription/universityDepartmentDescriptionDeletedListTab';
import { UniversityDepartmentDescriptionListTab } from './pages/universityDepartmentDescription/universityDepartmentDescription/universityDepartmentDescriptionListTab';
import { DriverLicenceDeletedListTab } from './pages/driverlicence/driverLicence/driverLicenceDeletedListTab';
import { ExperienceComponent } from './pages/experience/experience/experience.component';
import { ExperienceDeletedListTab } from './pages/experience/experience/experienceDeletedListTab';
import { ExperienceListTab } from './pages/experience/experience/experienceListTab';

import { LanguageDeletedListTab } from './pages/language/language/languageDeletedListTab';
import { LanguageLevelDeletedListTab } from './pages/languageLevel/languageLevel/languageLevelDeletedListTab';
import { LicenseDegreeComponent } from './pages/licenseDegree/licenseDegree/licenseDegree.component';
import { LicenseDegreeDeletedListTab } from './pages/licenseDegree/licenseDegree/licenseDegreeDeletedListTab';
import { LicenseDegreeListTab } from './pages/licenseDegree/licenseDegree/licenseDegreeListTab';
import { CompanyUserMainComponent } from './pages/main/companyUserMain/companyUserMain.component';
import { MainComponent } from './pages/main/main/main.component';
import { PersonelUserMainComponent } from './pages/main/personelUserMain/personelUserMain.component';
import { ModelMenuComponent } from './pages/modelMenu/modelMenu/modelMenu.component';
import { ModelMenuDeletedListTab } from './pages/modelMenu/modelMenu/modelMenuDeletedListTab';
import { ModelMenuListTab } from './pages/modelMenu/modelMenu/modelMenuListTab';
import { OperationClaimComponent } from './pages/operationClaim/operationClaim/operationClaim.component';
import { OperationClaimDeletedListTab } from './pages/operationClaim/operationClaim/operationClaimDeletedListTab';
import { OperationClaimListTab } from './pages/operationClaim/operationClaim/operationClaimListTab';
import { PersonelUserComponent } from './pages/personelUser/personelUser/personelUser.component';
import { PersonelUserDeletedListTab } from './pages/personelUser/personelUser/personelUserDeletedListTab';
import { PersonelUserListTab } from './pages/personelUser/personelUser/personelUserListTab';
import { PersonelUserAddressComponent } from './pages/personelUserAddress/personelUserAddress/personelUserAddress.component';
import { PersonelUserAddressDeletedListTab } from './pages/personelUserAddress/personelUserAddress/personelUserAddressDeletedListTab';
import { PersonelUserAddressListTab } from './pages/personelUserAddress/personelUserAddress/personelUserAddressListTab';
import { PersonelUserCoverLetterComponent } from './pages/personelUserCoverLetter/personelUserCoverLetter/personelUserCoverLetter.component';
import { PersonelUserCoverLetterDeletedListTab } from './pages/personelUserCoverLetter/personelUserCoverLetter/personelUserCoverLetterDeletedListTab';
import { PersonelUserCoverLetterListTab } from './pages/personelUserCoverLetter/personelUserCoverLetter/personelUserCoverLetterListTab';
import { PersonelUserCvComponent } from './pages/personelUserCv/personelUserCv/personelUserCv.component';
import { PersonelUserCvDeletedListTab } from './pages/personelUserCv/personelUserCv/personelUserCvDeletedListTab';
import { PersonelUserCvListTab } from './pages/personelUserCv/personelUserCv/personelUserCvListTab';
import { PersonelUserCvEducationComponent } from './pages/personelUserCvEducation/personelUserCvEducation/personelUserCvEducation.component';
import { PersonelUserCvEducationDeletedListTab } from './pages/personelUserCvEducation/personelUserCvEducation/personelUserCvEducationDeletedListTab';
import { PersonelUserCvEducationListTab } from './pages/personelUserCvEducation/personelUserCvEducation/personelUserCvEducationListTab';
import { PersonelUserCvSummaryComponent } from './pages/personelUserCvSummary/personelUserCvSummary/personelUserCvSummary.component';
import { PersonelUserCvSummaryDeletedListTab } from './pages/personelUserCvSummary/personelUserCvSummary/personelUserCvSummaryDeletedListTab';
import { PersonelUserCvSummaryListTab } from './pages/personelUserCvSummary/personelUserCvSummary/personelUserCvSummaryListTab';
import { PersonelUserCvWorkExperienceComponent } from './pages/personelUserCvWorkExperience/personelUserCvWorkExperience/personelUserCvWorkExperience.component';
import { PersonelUserCvWorkExperienceDeletedListTab } from './pages/personelUserCvWorkExperience/personelUserCvWorkExperience/personelUserCvWorkExperienceDeletedListTab';
import { PersonelUserCvWorkExperienceListTab } from './pages/personelUserCvWorkExperience/personelUserCvWorkExperience/personelUserCvWorkExperienceListTab';
import { PersonelUserFileComponent } from './pages/personelUserFile/personelUserFile/personelUserFile.component';
import { PersonelUserFileDeletedListTab } from './pages/personelUserFile/personelUserFile/personelUserFileDeletedListTab';
import { PersonelUserFileListTab } from './pages/personelUserFile/personelUserFile/personelUserFileListTab';
import { PersonelUserImageComponent } from './pages/personelUserImage/personelUserImage/personelUserImage.component';
import { PersonelUserImageDeletedListTab } from './pages/personelUserImage/personelUserImage/personelUserImageDeletedListTab';
import { PersonelUserImageListTab } from './pages/personelUserImage/personelUserImage/personelUserImageListTab';
import { PersonelUserImageSlideTab } from './pages/personelUserImage/personelUserImage/personelUserImageSlideTab';
import { RegionComponent } from './pages/region/region/region.component';
import { RegionDeletedListTab } from './pages/region/region/regionDeletedListTab';
import { RegionListTab } from './pages/region/region/regionListTab';
import { SectorComponent } from './pages/sector/sector/sector.component';
import { SectorDeletedListTab } from './pages/sector/sector/sectorDeletedListTab';
import { SectorListTab } from './pages/sector/sector/sectorListTab';
import { TaxOfficeComponent } from './pages/taxOffice/taxOffice/taxOffice.component';
import { TaxOfficeDeletedListTab } from './pages/taxOffice/taxOffice/taxOfficeDeletedListTab';
import { TaxOfficeListTab } from './pages/taxOffice/taxOffice/taxOfficeListTab';
import { UniversityComponent } from './pages/university/university/university.component';
import { UniversityDeletedListTab } from './pages/university/university/universityDeletedListTab';
import { UniversityListTab } from './pages/university/university/universityListTab';
import { UniversityImageComponent } from './pages/universityImage/universityImage/universityImage.component';
import { UniversityImageDeletedListTab } from './pages/universityImage/universityImage/UniversityImageDeletedListTab';
import { UniversityImageListTab } from './pages/universityImage/universityImage/universityImageListTab';
import { UserOperationClaimComponent } from './pages/userOperationClaim/userOperationClaim/userOperationClaim.component';
import { UserOperationClaimDeletedListTab } from './pages/userOperationClaim/userOperationClaim/userOperationClaimDeletedListTab';
import { UserOperationClaimListTab } from './pages/userOperationClaim/userOperationClaim/userOperationClaimListTab';
import { WorkingMethodComponent } from './pages/workingMethod/workingMethod/workingMethod.component';
import { WorkingMethodDeletedListTab } from './pages/workingMethod/workingMethod/workingMethodDeletedListTab';
import { WorkingMethodListTab } from './pages/workingMethod/workingMethod/workingMethodListTab';
import { WorkAreaComponent } from './pages/workArea/workArea/workArea.component';
import { CompanyUserGuard } from './guards/company-user.guard';
import { PersonelUserGuard } from './guards/personel-user.guard';
import { CountDeletedListTab } from './pages/count/count/countDeletedListTab';
import { PositionComponent } from './pages/position/position/position.component';
import { PositionDeletedListTab } from './pages/position/position/positionDeletedListTab';
import { PositionListTab } from './pages/position/position/positionListTab';
import { PositionLevelComponent } from './pages/positionLevel/positionLevel/positionLevel.component';
import { PositionLevelDeletedListTab } from './pages/positionLevel/positionLevel/positionLevelDeletedListTab';
import { PositionLevelListTab } from './pages/positionLevel/positionLevel/positionLevelListTab';
import { WorkAreaDeletedListTab } from './pages/workArea/workArea/workAreaDeletedListTab';
import { WorkAreaListTab } from './pages/workArea/workArea/workAreaListTab';
import { PositionDescriptionComponent } from './pages/positionDescription/positionDescription/positionDescription.component';
import { PositionDescriptionListTab } from './pages/positionDescription/positionDescription/positionDescriptionListTab';
import { PositionDescriptionDeletedListTab } from './pages/positionDescription/positionDescription/positionDescriptionDeletedListTab';
import { UniversityDepartmentDescriptionComponent } from './pages/universityDepartmentDescription/universityDepartmentDescription/universityDepartmentDescription.component';
import { SectorDescriptionComponent } from './pages/sectorDescription/sectorDescription/sectorDescription.component';
import { SectorDescriptionListTab } from './pages/sectorDescription/sectorDescription/sectorDescription.ListTab';
import { SectorDescriptionDeletedListTab } from './pages/sectorDescription/sectorDescription/sectorDescription.DeletedListTab';
import { UniversityDescriptionComponent } from './pages/universityDescription/universityDescription/universityDescription.component';
import { UniversityDescriptionListTab } from './pages/universityDescription/universityDescription/universityDescriptionListTab';
import { UniversityDescriptionDeletedListTab } from './pages/universityDescription/universityDescription/universityDescriptionDeletedListTab';
import { PositionByPageListTab } from './pages/position/position/positionByPageListTab';
import { AllUserByPageListTab } from './pages/allUser/allUser/allUserByPageListTab';
import { CompanyUserByPageListTab } from './pages/companyUser/companyUser/companyUserByPageListTab';
import { PersonelUserByPageListTab } from './pages/personelUser/personelUser/positionByPageListTab';
import { UniversityByPageListTab } from './pages/university/university/positionByPageListTab';
import { UniversityDepartmentByPageListTab } from './pages/universityDepartment/universityDepartment/positionByPageListTab';
import { TaxOfficeByPageListTab } from './pages/taxOffice/taxOffice/positionByPageListTab';
import { MainGuard } from './guards/main.guard';

//-----------------

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', redirectTo: 'dashboard/main', pathMatch: 'full' },

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [LoginGuard, ExpirationGuard],
    title: 'Kariyerim Admin',
    children: [
      {
        path: 'main',
        component: MainComponent,
        canActivate: [LoginGuard, ExpirationGuard, MainGuard],
      },
      {
        path: 'personelusermain',
        component: PersonelUserMainComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },

      {
        path: 'companyusermain',
        component: CompanyUserMainComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },
      {
        path: 'updatepassword',
        component: UpdatePasswordComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },
      {
        path: 'alluser',
        component: AllUserComponent,
        canActivate: [LoginGuard, ExpirationGuard],
        children: [
          {
            path: 'alluserbypagelisttab',
            component: AllUserByPageListTab,
            canActivate: [LoginGuard, ExpirationGuard],
          },
          {
            path: 'alluserlisttab',
            component: AllUserListTab,
            canActivate: [LoginGuard, ExpirationGuard],
          },
          {
            path: 'alluserdeletedlisttab',
            component: AllUserDeletedListTab,
            canActivate: [LoginGuard, ExpirationGuard],
          },
        ],
      },
      {
        path: 'city',
        component: CityComponent,
        canActivate: [LoginGuard, ExpirationGuard],
        children: [
          {
            path: 'citylisttab',
            component: CityListTab,
            canActivate: [LoginGuard, ExpirationGuard],
          },
          {
            path: 'citydeletedlisttab',
            component: CityDeletedListTab,
            canActivate: [LoginGuard, ExpirationGuard, StatusGuard],
          },
        ],
      },

      {
        path: 'companyuser',
        component: CompanyUserComponent,
        canActivate: [LoginGuard, ExpirationGuard],
        children: [
          {
            path: 'companyuserbypagelisttab',
            component: CompanyUserByPageListTab,
            canActivate: [LoginGuard, ExpirationGuard],
          },
          {
            path: 'companyuserlisttab',
            component: CompanyUserListTab,
            canActivate: [LoginGuard, ExpirationGuard],
          },
          {
            path: 'companyuserdeletedlisttab',
            component: CompanyUserDeletedListTab,
            canActivate: [LoginGuard, ExpirationGuard, CompanyUserGuard],
          },
        ],
      },

      {
        path: 'companyuseraddress',
        component: CompanyUserAddressComponent,
        canActivate: [LoginGuard, ExpirationGuard, CompanyUserGuard],
        children: [
          {
            path: 'companyuseraddresslisttab',
            component: CompanyUserAddressListTab,
            canActivate: [LoginGuard, ExpirationGuard],
          },
          {
            path: 'companyuseraddressdeletedlisttab',
            component: CompanyUserAddressDeletedListTab,
            canActivate: [LoginGuard, ExpirationGuard],
          },
        ],
      },

      {
        path: 'companyuseradvert',
        component: CompanyUserAdvertComponent,
        canActivate: [LoginGuard, ExpirationGuard],
        children: [
          {
            path: 'companyuseradvertlisttab',
            component: CompanyUserAdvertListTab,
            canActivate: [LoginGuard, ExpirationGuard],
          },
          {
            path: 'companyuseradvertdeletedlisttab',
            component: CompanyUserAdvertDeletedListTab,
            canActivate: [LoginGuard, ExpirationGuard, CompanyUserGuard],
          },
        ],
      },

      {
        path: 'companyuseradvertcity',
        component: CompanyUserAdvertCityComponent,
        canActivate: [LoginGuard, ExpirationGuard, CompanyUserGuard],
        children: [
          {
            path: 'companyuseradvertcitylisttab',
            component: CompanyUserAdvertCityListTab,
            canActivate: [LoginGuard, ExpirationGuard],
          },
          {
            path: 'companyuseradvertcitydeletedlisttab',
            component: CompanyUserAdvertCityDeletedListTab,
            canActivate: [LoginGuard, ExpirationGuard],
          },
        ],
      },

      {
        path: 'companyuseradvertjobdescription',
        component: CompanyUserAdvertJobDescriptionComponent,
        canActivate: [LoginGuard, ExpirationGuard, CompanyUserGuard],
        children: [
          {
            path: 'companyuseradvertjobdescriptionlisttab',
            component: CompanyUserAdvertJobDescriptionListTab,
            canActivate: [LoginGuard, ExpirationGuard],
          },
          {
            path: 'companyuseradvertjobdescriptiondeletedlisttab',
            component: CompanyUserAdvertJobDescriptionDeletedListTab,
            canActivate: [LoginGuard, ExpirationGuard],
          },
        ],
      },
      {
        path: 'companyuserdepartment',
        component: CompanyUserDepartmentComponent,
        canActivate: [LoginGuard, ExpirationGuard, CompanyUserGuard],
        children: [
          {
            path: 'companyuserdepartmentlisttab',
            component: CompanyUserDepartmentListTab,
            canActivate: [LoginGuard, ExpirationGuard],
          },
          {
            path: 'companyuserdepartmentdeletedlisttab',
            component: CompanyUserDepartmentDeletedListTab,
            canActivate: [LoginGuard, ExpirationGuard],
          },
        ],
      },

      {
        path: 'companyuserfile',
        component: CompanyUserFileComponent,
        canActivate: [LoginGuard, ExpirationGuard, CompanyUserGuard],
        children: [
          {
            path: 'companyuserfilelisttab',
            component: CompanyUserFileListTab,
            canActivate: [LoginGuard, ExpirationGuard],
          },
          {
            path: 'companyuserfiledeletedlisttab',
            component: CompanyUserFileDeletedListTab,
            canActivate: [LoginGuard, ExpirationGuard],
          },
        ],
      },

      {
        path: 'companyuserimage',
        component: CompanyUserImageComponent,
        canActivate: [LoginGuard, ExpirationGuard, CompanyUserGuard],
        children: [
          {
            path: 'companyuserimagelisttab',
            component: CompanyUserImageListTab,
            canActivate: [LoginGuard, ExpirationGuard],
          },
          {
            path: 'companyuserimagedeletedlisttab',
            component: CompanyUserImageDeletedListTab,
            canActivate: [LoginGuard, ExpirationGuard],
          },
          {
            path: 'companyuserimageslidetab',
            component: CompanyUserImageSlideTab,
            canActivate: [LoginGuard, ExpirationGuard],
          },
        ],
      },

      {
        path: 'sector',
        component: SectorComponent,
        canActivate: [LoginGuard, ExpirationGuard],
        children: [
          {
            path: 'sectorlisttab',
            component: SectorListTab,
            canActivate: [LoginGuard, ExpirationGuard],
          },
          {
            path: 'sectordeletedlisttab',
            component: SectorDeletedListTab,
            canActivate: [LoginGuard, ExpirationGuard, StatusGuard],
          },
        ],
      },

      {
        path: 'sectordescription',
        component: SectorDescriptionComponent,
        canActivate: [LoginGuard, ExpirationGuard],
        children: [
          {
            path: 'sectordescriptionlisttab',
            component: SectorDescriptionListTab,
            canActivate: [LoginGuard, ExpirationGuard],
          },
          {
            path: 'sectordescriptiondeletedlisttab',
            component: SectorDescriptionDeletedListTab,
            canActivate: [LoginGuard, ExpirationGuard, StatusGuard],
          },
        ],
      },

      {
        path: 'country',
        component: CountryComponent,
        canActivate: [LoginGuard, ExpirationGuard],
        children: [
          {
            path: 'countrylisttab',
            component: CountryListTab,
            canActivate: [LoginGuard, ExpirationGuard],
          },
          {
            path: 'countrydeletedlisttab',
            component: CountryDeletedListTab,
            canActivate: [LoginGuard, ExpirationGuard, StatusGuard],
          },
        ],
      },

      {
        path: 'universitydepartment',
        component: UniversityDepartmentComponent,
        canActivate: [LoginGuard, ExpirationGuard],
        children: [
          {
            path: 'universitydepartmentbypagelisttab',
            component: UniversityDepartmentByPageListTab,
            canActivate: [LoginGuard, ExpirationGuard],
          },
          {
            path: 'universitydepartmentlisttab',
            component: UniversityDepartmentListTab,
            canActivate: [LoginGuard, ExpirationGuard],
          },
          {
            path: 'universitydepartmentdeletedlisttab',
            component: UniversityDepartmentDeletedListTab,
            canActivate: [LoginGuard, ExpirationGuard, StatusGuard],
          },
        ],
      },

      {
        path: 'universitydepartmentdescription',
        component: UniversityDepartmentDescriptionComponent,
        canActivate: [LoginGuard, ExpirationGuard],
        children: [
          {
            path: 'universitydepartmentdescriptionlisttab',
            component: UniversityDepartmentDescriptionListTab,
            canActivate: [LoginGuard, ExpirationGuard],
          },
          {
            path: 'universitydepartmentdescriptiondeletedlisttab',
            component: UniversityDepartmentDescriptionDeletedListTab,
            canActivate: [LoginGuard, ExpirationGuard, StatusGuard],
          },
        ],
      },

      {
        path: 'personelusercv',
        component: PersonelUserCvComponent,
        canActivate: [LoginGuard, ExpirationGuard],
        children: [
          {
            path: 'personelusercvlisttab',
            component: PersonelUserCvListTab,
            canActivate: [LoginGuard, ExpirationGuard],
          },
          {
            path: 'personelusercvdeletedlisttab',
            component: PersonelUserCvDeletedListTab,
            canActivate: [LoginGuard, ExpirationGuard],
          },
        ],
      },

      {
        path: 'driverlicence',
        component: DriverLicenceComponent,
        canActivate: [LoginGuard, ExpirationGuard],
        children: [
          {
            path: 'driverlicencelisttab',
            component: DriverLicenceListTab,
            canActivate: [LoginGuard, ExpirationGuard],
          },
          {
            path: 'driverlicencedeletedlisttab',
            component: DriverLicenceDeletedListTab,
            canActivate: [LoginGuard, ExpirationGuard, StatusGuard],
          },
        ],
      },

      {
        path: 'count',
        component: CountComponent,
        canActivate: [LoginGuard, ExpirationGuard],
        children: [
          {
            path: 'countlisttab',
            component: CountListTab,
            canActivate: [LoginGuard, ExpirationGuard],
          },
          {
            path: 'countdeletedlisttab',
            component: CountDeletedListTab,
            canActivate: [LoginGuard, ExpirationGuard, StatusGuard],
          },
        ],
      },

      {
        path: 'experience',
        component: ExperienceComponent,
        canActivate: [LoginGuard, ExpirationGuard],
        children: [
          {
            path: 'experiencelisttab',
            component: ExperienceListTab,
            canActivate: [LoginGuard, ExpirationGuard],
          },
          {
            path: 'experiencedeletedlisttab',
            component: ExperienceDeletedListTab,
            canActivate: [LoginGuard, ExpirationGuard, StatusGuard],
          },
        ],
      },

      {
        path: 'languagelevel',
        component: LanguageLevelComponent,
        canActivate: [LoginGuard, ExpirationGuard],
        children: [
          {
            path: 'languagelevellisttab',
            component: LanguageLevelListTab,
            canActivate: [LoginGuard, ExpirationGuard],
          },
          {
            path: 'languageleveldeletedlisttab',
            component: LanguageLevelDeletedListTab,
            canActivate: [LoginGuard, ExpirationGuard, StatusGuard],
          },
        ],
      },

      {
        path: 'language',
        component: LanguageComponent,
        canActivate: [LoginGuard, ExpirationGuard],
        children: [
          {
            path: 'languagelisttab',
            component: LanguageListTab,
            canActivate: [LoginGuard, ExpirationGuard],
          },
          {
            path: 'languagedeletedlisttab',
            component: LanguageDeletedListTab,
            canActivate: [LoginGuard, ExpirationGuard, StatusGuard],
          },
        ],
      },

      {
        path: 'licensedegree',
        component: LicenseDegreeComponent,
        canActivate: [LoginGuard, ExpirationGuard],
        children: [
          {
            path: 'licensedegreelisttab',
            component: LicenseDegreeListTab,
            canActivate: [LoginGuard, ExpirationGuard],
          },
          {
            path: 'licensedegreedeletedlisttab',
            component: LicenseDegreeDeletedListTab,
            canActivate: [LoginGuard, ExpirationGuard, StatusGuard],
          },
        ],
      },

      {
        path: 'modelmenu',
        component: ModelMenuComponent,
        canActivate: [LoginGuard, ExpirationGuard, StatusGuard],
        children: [
          {
            path: 'modelmenulisttab',
            component: ModelMenuListTab,
            canActivate: [LoginGuard, ExpirationGuard],
          },
          {
            path: 'modelmenudeletedlisttab',
            component: ModelMenuDeletedListTab,
            canActivate: [LoginGuard, ExpirationGuard],
          },
        ],
      },

      {
        path: 'operationclaim',
        component: OperationClaimComponent,
        canActivate: [LoginGuard, ExpirationGuard, StatusGuard],
        children: [
          {
            path: 'operationclaimlisttab',
            component: OperationClaimListTab,
            canActivate: [LoginGuard, ExpirationGuard],
          },
          {
            path: 'operationclaimdeletedlisttab',
            component: OperationClaimDeletedListTab,
            canActivate: [LoginGuard, ExpirationGuard],
          },
        ],
      },

      {
        path: 'region',
        component: RegionComponent,
        canActivate: [LoginGuard, ExpirationGuard],
        children: [
          {
            path: 'regionlisttab',
            component: RegionListTab,
            canActivate: [LoginGuard, ExpirationGuard],
          },
          {
            path: 'regiondeletedlisttab',
            component: RegionDeletedListTab,
            canActivate: [LoginGuard, ExpirationGuard, StatusGuard],
          },
        ],
      },

      {
        path: 'taxoffice',
        component: TaxOfficeComponent,
        canActivate: [LoginGuard, ExpirationGuard],
        children: [
          {
            path: 'taxofficebypagelisttab',
            component: TaxOfficeByPageListTab,
            canActivate: [LoginGuard, ExpirationGuard],
          },
          {
            path: 'taxofficelisttab',
            component: TaxOfficeListTab,
            canActivate: [LoginGuard, ExpirationGuard],
          },
          {
            path: 'taxofficedeletedlisttab',
            component: TaxOfficeDeletedListTab,
            canActivate: [LoginGuard, ExpirationGuard, StatusGuard],
          },
        ],
      },

      {
        path: 'university',
        component: UniversityComponent,
        canActivate: [LoginGuard, ExpirationGuard],
        children: [
          {
            path: 'universitybypagelisttab',
            component: UniversityByPageListTab,
            canActivate: [LoginGuard, ExpirationGuard],
          },
          {
            path: 'universitylisttab',
            component: UniversityListTab,
            canActivate: [LoginGuard, ExpirationGuard],
          },
          {
            path: 'universitydeletedlisttab',
            component: UniversityDeletedListTab,
            canActivate: [LoginGuard, ExpirationGuard, StatusGuard],
          },
        ],
      },
      {
        path: 'universitydescription',
        component: UniversityDescriptionComponent,
        canActivate: [LoginGuard, ExpirationGuard],
        children: [
          {
            path: 'universitydescriptionlisttab',
            component: UniversityDescriptionListTab,
            canActivate: [LoginGuard, ExpirationGuard],
          },
          {
            path: 'universitydescriptiondeletedlisttab',
            component: UniversityDescriptionDeletedListTab,
            canActivate: [LoginGuard, ExpirationGuard, StatusGuard],
          },
        ],
      },

      {
        path: 'universityimage',
        component: UniversityImageComponent,
        canActivate: [LoginGuard, ExpirationGuard],
        children: [
          {
            path: 'universityimagelisttab',
            component: UniversityImageListTab,
            canActivate: [LoginGuard, ExpirationGuard],
          },
          {
            path: 'universityimagedeletedlisttab',
            component: UniversityImageDeletedListTab,
            canActivate: [LoginGuard, ExpirationGuard, StatusGuard],
          },
          {
            path: 'universityimageslidetab',
            component: UniversityImageSlideTab,
            canActivate: [LoginGuard, ExpirationGuard],
          },
        ],
      },

      {
        path: 'position',
        component: PositionComponent,
        canActivate: [LoginGuard, ExpirationGuard],
        children: [
          {
            path: 'positionbypagelisttab',
            component: PositionByPageListTab,
            canActivate: [LoginGuard, ExpirationGuard],
          },
          {
            path: 'positionlisttab',
            component: PositionListTab,
            canActivate: [LoginGuard, ExpirationGuard],
          },
          {
            path: 'positiondeletedlisttab',
            component: PositionDeletedListTab,
            canActivate: [LoginGuard, ExpirationGuard, StatusGuard],
          },
        ],
      },
      {
        path: 'positiondescription',
        component: PositionDescriptionComponent,
        canActivate: [LoginGuard, ExpirationGuard],
        children: [
          {
            path: 'positiondescriptionlisttab',
            component: PositionDescriptionListTab,
            canActivate: [LoginGuard, ExpirationGuard],
          },
          {
            path: 'positiondescriptiondeletedlisttab',
            component: PositionDescriptionDeletedListTab,
            canActivate: [LoginGuard, ExpirationGuard, StatusGuard],
          },
        ],
      },
      {
        path: 'positionlevel',
        component: PositionLevelComponent,
        canActivate: [LoginGuard, ExpirationGuard],
        children: [
          {
            path: 'positionlevellisttab',
            component: PositionLevelListTab,
            canActivate: [LoginGuard, ExpirationGuard],
          },
          {
            path: 'positionleveldeletedlisttab',
            component: PositionLevelDeletedListTab,
            canActivate: [LoginGuard, ExpirationGuard, StatusGuard],
          },
        ],
      },

      {
        path: 'useroperationclaim',
        component: UserOperationClaimComponent,
        canActivate: [LoginGuard, ExpirationGuard, StatusGuard],
        children: [
          {
            path: 'useroperationclaimlisttab',
            component: UserOperationClaimListTab,
            canActivate: [LoginGuard, ExpirationGuard],
          },
          {
            path: 'useroperationclaimdeletedlisttab',
            component: UserOperationClaimDeletedListTab,
            canActivate: [LoginGuard, ExpirationGuard],
          },
        ],
      },

      {
        path: 'workingmethod',
        component: WorkingMethodComponent,
        canActivate: [LoginGuard, ExpirationGuard],
        children: [
          {
            path: 'workingmethodlisttab',
            component: WorkingMethodListTab,
            canActivate: [LoginGuard, ExpirationGuard],
          },
          {
            path: 'workingmethoddeletedlisttab',
            component: WorkingMethodDeletedListTab,
            canActivate: [LoginGuard, ExpirationGuard, StatusGuard],
          },
        ],
      },

      {
        path: 'workarea',
        component: WorkAreaComponent,
        canActivate: [LoginGuard, ExpirationGuard],
        children: [
          {
            path: 'workarealisttab',
            component: WorkAreaListTab,
            canActivate: [LoginGuard, ExpirationGuard],
          },
          {
            path: 'workareadeletedlisttab',
            component: WorkAreaDeletedListTab,
            canActivate: [LoginGuard, ExpirationGuard, StatusGuard],
          },
        ],
      },

      {
        path: 'personeluser',
        component: PersonelUserComponent,
        canActivate: [LoginGuard, ExpirationGuard, PersonelUserGuard],
        children: [
          {
            path: 'personeluserbypagelisttab',
            component: PersonelUserByPageListTab,
            canActivate: [LoginGuard, ExpirationGuard],
          },
          {
            path: 'personeluserlisttab',
            component: PersonelUserListTab,
            canActivate: [LoginGuard, ExpirationGuard],
          },
          {
            path: 'personeluserdeletedlisttab',
            component: PersonelUserDeletedListTab,
            canActivate: [LoginGuard, ExpirationGuard],
          },
        ],
      },

      {
        path: 'personeluseraddress',
        component: PersonelUserAddressComponent,
        canActivate: [LoginGuard, ExpirationGuard, PersonelUserGuard],
        children: [
          {
            path: 'personeluseraddresslisttab',
            component: PersonelUserAddressListTab,
            canActivate: [LoginGuard, ExpirationGuard],
          },
          {
            path: 'personeluseraddressdeletedlisttab',
            component: PersonelUserAddressDeletedListTab,
            canActivate: [LoginGuard, ExpirationGuard],
          },
        ],
      },

      {
        path: 'personelusercoverletter',
        component: PersonelUserCoverLetterComponent,
        canActivate: [LoginGuard, ExpirationGuard, PersonelUserGuard],
        children: [
          {
            path: 'personelusercoverletterlisttab',
            component: PersonelUserCoverLetterListTab,
            canActivate: [LoginGuard, ExpirationGuard],
          },
          {
            path: 'personelusercoverletterdeletedlisttab',
            component: PersonelUserCoverLetterDeletedListTab,
            canActivate: [LoginGuard, ExpirationGuard],
          },
        ],
      },

      {
        path: 'personelusercveducation',
        component: PersonelUserCvEducationComponent,
        canActivate: [LoginGuard, ExpirationGuard, PersonelUserGuard],
        children: [
          {
            path: 'personelusercveducationlisttab',
            component: PersonelUserCvEducationListTab,
            canActivate: [LoginGuard, ExpirationGuard],
          },
          {
            path: 'personelusercveducationdeletedlisttab',
            component: PersonelUserCvEducationDeletedListTab,
            canActivate: [LoginGuard, ExpirationGuard],
          },
        ],
      },

      {
        path: 'personelusercvsummary',
        component: PersonelUserCvSummaryComponent,
        canActivate: [LoginGuard, ExpirationGuard, PersonelUserGuard],
        children: [
          {
            path: 'personelusercvsummarylisttab',
            component: PersonelUserCvSummaryListTab,
            canActivate: [LoginGuard, ExpirationGuard],
          },
          {
            path: 'personelusercvsummarydeletedlisttab',
            component: PersonelUserCvSummaryDeletedListTab,
            canActivate: [LoginGuard, ExpirationGuard],
          },
        ],
      },

      {
        path: 'personeluserfile',
        component: PersonelUserFileComponent,
        canActivate: [LoginGuard, ExpirationGuard, PersonelUserGuard],
        children: [
          {
            path: 'personeluserfilelisttab',
            component: PersonelUserFileListTab,
            canActivate: [LoginGuard, ExpirationGuard],
          },
          {
            path: 'personeluserfiledeletedlisttab',
            component: PersonelUserFileDeletedListTab,
            canActivate: [LoginGuard, ExpirationGuard],
          },
        ],
      },

      {
        path: 'personeluserimage',
        component: PersonelUserImageComponent,
        canActivate: [LoginGuard, ExpirationGuard, PersonelUserGuard],
        children: [
          {
            path: 'personeluserimagelisttab',
            component: PersonelUserImageListTab,
            canActivate: [LoginGuard, ExpirationGuard],
          },
          {
            path: 'personeluserimagedeletedlisttab',
            component: PersonelUserImageDeletedListTab,
            canActivate: [LoginGuard, ExpirationGuard],
          },
          {
            path: 'personeluserimageslidetab',
            component: PersonelUserImageSlideTab,
            canActivate: [LoginGuard, ExpirationGuard],
          },
        ],
      },

      {
        path: 'personelusercvworkexperience',
        component: PersonelUserCvWorkExperienceComponent,
        canActivate: [LoginGuard, ExpirationGuard, PersonelUserGuard],
        children: [
          {
            path: 'personelusercvworkexperiencelisttab',
            component: PersonelUserCvWorkExperienceListTab,
            canActivate: [LoginGuard, ExpirationGuard],
          },
          {
            path: 'personelusercvworkexperiencedeletedlisttab',
            component: PersonelUserCvWorkExperienceDeletedListTab,
            canActivate: [LoginGuard, ExpirationGuard],
          },
        ],
      },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'registerPersonelUser', component: RegisterPersonelUserComponent },
  { path: 'registerCompanyUser', component: RegisterCompanyUserComponent },
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
];
