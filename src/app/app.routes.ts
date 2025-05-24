import { Routes } from '@angular/router';
import { ExpirationGuard } from './guards/expiration.guard';
import { CompanyUserComponent } from './pages/companyUser/companyUser/companyUser.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UpdatePasswordComponent } from './components/updatePassword/updatePassword.component';
import { LoginGuard } from './guards/login.guard';
import { AllUserComponent } from './pages/allUser/allUser/allUser.component';
import { AllUserDeletedListTab } from './pages/allUser/allUser/allUserDeletedListTab';
import { AllUserListTab } from './pages/allUser/allUser/allUserListTab';
import { CityComponent } from './pages/city/city/city.component';
import { CityListTab } from './pages/city/city/cityListTab';
import { CityDeletedListComponent } from './pages/city/cityDeletedList/cityDeletedList.component';
import { CompanyUserListTab } from './pages/companyUser/companyUser/companyUserListTab';
import { CompanyUserDeletedListComponent } from './pages/companyUser/companyUserDeletedList/companyUserDeletedList.component';
import { CompanyUserAddressComponent } from './pages/companyUserAddress/companyUserAddress/companyUserAddress.component';
import { CompanyUserAddressListTab } from './pages/companyUserAddress/companyUserAddress/companyUserAddressListTab';
import { CompanyUserAddressDeletedListComponent } from './pages/companyUserAddress/companyUserAddressDeletedList/companyUserAddressDeletedList.component';
import { CompanyUserDepartmentComponent } from './pages/companyUserDepartment/companyUserDepartment/companyUserDepartment.component';
import { CompanyUserDepartmentListTab } from './pages/companyUserDepartment/companyUserDepartment/companyUserDepartmentListTab';
import { CompanyUserDepartmentDeletedListComponent } from './pages/companyUserDepartment/companyUserDepartmentDeletedList/companyUserDepartmentDeletedList.component';
import { CompanyUserFileComponent } from './pages/companyUserFile/companyUserFile/companyUserFile.component';
import { CompanyUserFileListTab } from './pages/companyUserFile/companyUserFile/companyUserFileListTab';
import { CompanyUserFileDeletedListComponent } from './pages/companyUserFile/companyUserFileDeletedList/companyUserFileDeletedList.component';
import { CompanyUserImageComponent } from './pages/companyUserImage/companyUserImage/companyUserImage.component';
import { CompanyUserImageListTab } from './pages/companyUserImage/companyUserImage/companyUserImageListTab';
import { CompanyUserImageDeletedListComponent } from './pages/companyUserImage/companyUserImageDeletedList/companyUserImageDeletedList.component';
import { CompanyUserImageSlideComponent } from './pages/companyUserImage/companyUserImageSlide/companyUserImageSlide.component';
import { CountryComponent } from './pages/country/country/country.component';
import { CountryListTab } from './pages/country/country/countryListTab';
import { CountryDeletedListComponent } from './pages/country/countryDeletedList/countryDeletedList.component';
import { DriverLicenceComponent } from './pages/driverlicence/driverLicence/driverLicence.component';
import { DriverLicenceListTab } from './pages/driverlicence/driverLicence/driverLicenceListTab';
import { DriverLicenceDeletedListComponent } from './pages/driverlicence/driverLicenceDeletedList/driverLicenceDeletedList.component';
import { FacultyComponent } from './pages/faculty/faculty/faculty.component';
import { FacultyListTab } from './pages/faculty/faculty/facultyListTab';
import { FacultyDeletedListComponent } from './pages/faculty/facultyDeletedList/facultyDeletedList.component';
import { LanguageComponent } from './pages/language/language/language.component';
import { LanguageListTab } from './pages/language/language/languageListTab';
import { LanguageDeletedListComponent } from './pages/language/languageDeletedList/languageDeletedList.component';
import { LanguageLevelComponent } from './pages/languageLevel/languageLevel/languageLevel.component';
import { LanguageLevelListTab } from './pages/languageLevel/languageLevel/languageLevelListTab';
import { LanguageLevelDeletedListComponent } from './pages/languageLevel/languageLevelDeletedList/languageLevelDeletedList.component';
import { LicenceDegreeComponent } from './pages/licenceDegree/licenceDegree/licenceDegree.component';
import { LicenceDegreeListTab } from './pages/licenceDegree/licenceDegree/licenceDegreeListTab';
import { LicenceDegreeDeletedListComponent } from './pages/licenceDegree/licenceDegreeDeletedList/licenceDegreeDeletedList.component';
import { CompanyUserMainComponent } from './pages/main/companyUserMain/companyUserMain.component';
import { MainComponent } from './pages/main/main/main.component';
import { PersonelUserMainComponent } from './pages/main/personelUserMain/personelUserMain.component';
import { ModelMenuListTab } from './pages/modelMenu/modelMenu/modelMenuListTab';
import { ModelMenuDeletedListComponent } from './pages/modelMenu/modelMenuDeletedLİst/modelMenuDeletedList.component';
import { OperationClaimComponent } from './pages/operationClaim/operationClaim/operationClaim.component';
import { OperationClaimListTab } from './pages/operationClaim/operationClaim/operationClaimListTab';
import { OperationClaimDeletedListComponent } from './pages/operationClaim/operationClaimDeletedLİst/operationClaimDeletedList.component';
import { PersonelUserComponent } from './pages/personelUser/personelUser/personelUser.component';
import { PersonelUserListTab } from './pages/personelUser/personelUser/personelUserListTab';
import { PersonelUserDeletedListComponent } from './pages/personelUser/personelUserDeletedLİst/personelUserDeletedList.component';
import { PersonelUserAddressComponent } from './pages/personelUserAddress/personelUserAddress/personelUserAddress.component';
import { PersonelUserAddressListTab } from './pages/personelUserAddress/personelUserAddress/personelUserAddressListTab';
import { PersonelUserAddressDeletedListComponent } from './pages/personelUserAddress/personelUserAddressDeletedLİst/personelUserAddressDeletedList.component';
import { PersonelUserCoverLetterComponent } from './pages/personelUserCoverLetter/personelUserCoverLetter/personelUserCoverLetter.component';
import { PersonelUserCoverLetterListTab } from './pages/personelUserCoverLetter/personelUserCoverLetter/personelUserCoverLetterListTab';
import { PersonelUserCoverLetterDeletedListComponent } from './pages/personelUserCoverLetter/personelUserCoverLetterDeletedList/personelUserCoverLetterDeletedList.component';
import { PersonelUserCvComponent } from './pages/personelUserCv/personelUserCv/personelUserCv.component';
import { PersonelUserCvListTab } from './pages/personelUserCv/personelUserCv/personelUserCvListTab';
import { PersonelUserCvDeletedListComponent } from './pages/personelUserCv/personelUserCvDeletedList/personelUserCvDeletedList.component';
import { PersonelUserCvEducationComponent } from './pages/personelUserCvEducation/personelUserCvEducation/personelUserCvEducation.component';
import { PersonelUserCvEducationListTab } from './pages/personelUserCvEducation/personelUserCvEducation/personelUserCvEducationListTab';
import { PersonelUserCvEducationDeletedListComponent } from './pages/personelUserCvEducation/personelUserCvEducationDeletedList/personelUserCvEducationDeletedList.component';
import { PersonelUserCvSummaryComponent } from './pages/personelUserCvSummary/personelUserCvSummary/personelUserCvSummary.component';
import { PersonelUserCvSummaryListTab } from './pages/personelUserCvSummary/personelUserCvSummary/personelUserCvSummaryListTab';
import { PersonelUserCvSummaryDeletedListComponent } from './pages/personelUserCvSummary/personelUserCvSummaryDeletedList/personelUserCvSummaryDeletedList.component';
import { PersonelUserCvWorkExperienceComponent } from './pages/personelUserCvWorkExperience/personelUserCvWorkExperience/personelUserCvWorkExperience.component';
import { PersonelUserCvWorkExperienceListTab } from './pages/personelUserCvWorkExperience/personelUserCvWorkExperience/personelUserCvWorkExperienceListTab';
import { PersonelUserCvWorkExperienceDeletedListComponent } from './pages/personelUserCvWorkExperience/personelUserCvWorkExperienceDeletedList/personelUserCvWorkExperienceDeletedList.component';
import { PersonelUserFileComponent } from './pages/personelUserFile/personelUserFile/personelUserFile.component';
import { PersonelUserFileListTab } from './pages/personelUserFile/personelUserFile/personelUserFileListTab';
import { PersonelUserFileDeletedListComponent } from './pages/personelUserFile/personelUserFileDeletedList/personelUserFileDeletedList.component';
import { PersonelUserImageComponent } from './pages/personelUserImage/personelUserImage/personelUserImage.component';
import { PersonelUserImageListTab } from './pages/personelUserImage/personelUserImage/personelUserImageListTab';
import { PersonelUserImageDeletedListComponent } from './pages/personelUserImage/personelUserImageDeletedList/personelUserImageDeletedList.component';
import { PersonelUserImageSlideComponent } from './pages/personelUserImage/personelUserImageSlide/personelUserImageSlide.component';
import { RegionComponent } from './pages/region/region/region.component';
import { RegionListTab } from './pages/region/region/regionListTab';
import { RegionDeletedListComponent } from './pages/region/regionDeletedLİst/regionDeletedList.component';
import { SectorComponent } from './pages/sector/sector/sector.component';
import { SectorListTab } from './pages/sector/sector/sectorListTab';
import { SectorDeletedListComponent } from './pages/sector/sectorDeletedLİst/sectorDeletedList.component';
import { TaxOfficeComponent } from './pages/taxOffice/taxOffice/taxOffice.component';
import { TaxOfficeListTab } from './pages/taxOffice/taxOffice/taxOfficeListTab';
import { TaxOfficeDeletedListComponent } from './pages/taxOffice/taxOfficeDeletedLİst/taxOfficeDeletedList.component';
import { UniversityComponent } from './pages/university/university/university.component';
import { UniversityListTab } from './pages/university/university/universityListTab';
import { UniversityDeletedListComponent } from './pages/university/universityDeletedLİst/universityDeletedList.component';
import { UniversityDepartmentComponent } from './pages/universityDepartment/universityDepartment/universityDepartment.component';
import { UniversityDepartmentListTab } from './pages/universityDepartment/universityDepartment/universityDepartmentListTab';
import { UniversityDepartmentDeletedListComponent } from './pages/universityDepartment/universityDepartmentDeletedLİst/universityDepartmentDeletedList.component';
import { UserOperationClaimComponent } from './pages/userOperationClaim/userOperationClaim/userOperationClaim.component';
import { UserOperationClaimListTab } from './pages/userOperationClaim/userOperationClaim/userOperationClaimListTab';
import { UserOperationClaimDeletedListComponent } from './pages/userOperationClaim/userOperationClaimDeletedLİst/userOperationClaimDeletedList.component';
import { WorkingMethodComponent } from './pages/workingMethod/workingMethod/workingMethod.component';
import { WorkingMethodListTab } from './pages/workingMethod/workingMethod/workingMethodListTab';
import { WorkingMethodDeletedListComponent } from './pages/workingMethod/workingMethodDeletedLİst/workingMethodDeletedList.component';
import { ModelMenuListComponent } from './pages/modelMenu/modelMenuList/modelMenuList.component';
import { ModelMenuComponent } from './pages/modelMenu/modelMenu/modelMenu.component';
import { DepartmentComponent } from './pages/department/department/department.component';
import { DepartmentListTab } from './pages/department/department/departmentListTab';
import { DepartmentDeletedListComponent } from './pages/department/departmentDeletedList/departmentDeletedList.component';
import { DepartmentDetailComponent } from './pages/department/departmentDetail/departmentDetail.component';
import { DepartmentDetailMainListTab } from './pages/departmentDetail/departmentDetailMain/departmentDetailMainListTab';
import { DepartmentDetailDeletedListComponent } from './pages/departmentDetail/departmentDetailDeletedList/departmentDetailDeletedList.component';
import { DepartmentDetailMainComponent } from './pages/departmentDetail/departmentDetailMain/departmentDetailMain.component';
import { DepartmentDetailMainDeletedListTab } from './pages/departmentDetail/departmentDetailMain/departmentDetailMainDeletedListTab';
//-----------------

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

  {
    path: 'dashboard',
    component: DashboardComponent,
    title: 'Kariyerim Admin',
    children: [
      {
        path: '',
        component: MainComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },
      {
        path: 'main',
        component: MainComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },
      {
        path: 'main/personelusermain',
        component: PersonelUserMainComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },

      {
        path: 'main/companyusermain',
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
            component: CityDeletedListComponent,
            canActivate: [LoginGuard, ExpirationGuard],
          },
        ],
      },

      {
        path: 'companyuser',
        component: CompanyUserComponent,
        canActivate: [LoginGuard, ExpirationGuard],
        children: [
          {
            path: 'companyuserlisttab',
            component: CompanyUserListTab,
            canActivate: [LoginGuard, ExpirationGuard],
          },
          {
            path: 'companyuserdeletedlisttab',
            component: CompanyUserDeletedListComponent,
            canActivate: [LoginGuard, ExpirationGuard],
          },
        ],
      },

      {
        path: 'companyuseraddress',
        component: CompanyUserAddressComponent,
        canActivate: [LoginGuard, ExpirationGuard],
        children: [
          {
            path: 'companyuseraddresslisttab',
            component: CompanyUserAddressListTab,
            canActivate: [LoginGuard, ExpirationGuard],
          },
          {
            path: 'companyuseraddressdeletedlisttab',
            component: CompanyUserAddressDeletedListComponent,
            canActivate: [LoginGuard, ExpirationGuard],
          },
        ],
      },

      {
        path: 'companyuserdepartment',
        component: CompanyUserDepartmentComponent,
        canActivate: [LoginGuard, ExpirationGuard],
        children: [
          {
            path: 'companyuserdepartmentlisttab',
            component: CompanyUserDepartmentListTab,
            canActivate: [LoginGuard, ExpirationGuard],
          },
          {
            path: 'companyuserdepartmentdeletedlisttab',
            component: CompanyUserDepartmentDeletedListComponent,
            canActivate: [LoginGuard, ExpirationGuard],
          },
        ],
      },

      {
        path: 'companyuserfile',
        component: CompanyUserFileComponent,
        canActivate: [LoginGuard, ExpirationGuard],
        children: [
          {
            path: 'companyuserfilelisttab',
            component: CompanyUserFileListTab,
            canActivate: [LoginGuard, ExpirationGuard],
          },
          {
            path: 'companyuserfiledeletedlisttab',
            component: CompanyUserFileDeletedListComponent,
            canActivate: [LoginGuard, ExpirationGuard],
          },
        ],
      },

      {
        path: 'companyuserimage',
        component: CompanyUserImageComponent,
        canActivate: [LoginGuard, ExpirationGuard],
        children: [
          {
            path: 'companyuserimagelisttab',
            component: CompanyUserImageListTab,
            canActivate: [LoginGuard, ExpirationGuard],
          },
          {
            path: 'companyuserimagedeletedlisttab',
            component: CompanyUserImageDeletedListComponent,
            canActivate: [LoginGuard, ExpirationGuard],
          },
          {
            path: 'companyuserimageslidetab',
            component: CompanyUserImageSlideComponent,
            canActivate: [LoginGuard, ExpirationGuard],
          },
        ],
      },
      {
        path: 'companyuserimages/companyuserimageslide',
        component: CompanyUserImageSlideComponent,
        canActivate: [LoginGuard, ExpirationGuard],
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
            component: SectorDeletedListComponent,
            canActivate: [LoginGuard, ExpirationGuard],
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
            component: CountryDeletedListComponent,
            canActivate: [LoginGuard, ExpirationGuard],
          },
        ],
      },

      {
        path: 'department',
        component: DepartmentComponent,
        canActivate: [LoginGuard, ExpirationGuard],
        children: [
          {
            path: 'departmentlisttab',
            component: DepartmentListTab,
            canActivate: [LoginGuard, ExpirationGuard],
          },
          {
            path: 'departmentdeletedlisttab',
            component: DepartmentDeletedListComponent,
            canActivate: [LoginGuard, ExpirationGuard],
          },
        ],
      },

      {
        path: 'departmentdetail',
        component: DepartmentDetailMainComponent,
        canActivate: [LoginGuard, ExpirationGuard],
        children: [
          {
            path: 'departmentdetaillisttab',
            component: DepartmentDetailMainListTab,
            canActivate: [LoginGuard, ExpirationGuard],
          },
          {
            path: 'departmentdetaildeletedlisttab',
            component: DepartmentDetailMainDeletedListTab,
            canActivate: [LoginGuard, ExpirationGuard],
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
            component: PersonelUserCvDeletedListComponent,
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
            component: DriverLicenceDeletedListComponent,
            canActivate: [LoginGuard, ExpirationGuard],
          },
        ],
      },

      {
        path: 'faculty',
        component: FacultyComponent,
        canActivate: [LoginGuard, ExpirationGuard],
        children: [
          {
            path: 'facultylisttab',
            component: FacultyListTab,
            canActivate: [LoginGuard, ExpirationGuard],
          },
          {
            path: 'facultydeletedlisttab',
            component: FacultyDeletedListComponent,
            canActivate: [LoginGuard, ExpirationGuard],
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
            component: LanguageLevelDeletedListComponent,
            canActivate: [LoginGuard, ExpirationGuard],
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
            component: LanguageDeletedListComponent,
            canActivate: [LoginGuard, ExpirationGuard],
          },
        ],
      },

      {
        path: 'licencedegree',
        component: LicenceDegreeComponent,
        canActivate: [LoginGuard, ExpirationGuard],
        children: [
          {
            path: 'licencedegreelisttab',
            component: LicenceDegreeListTab,
            canActivate: [LoginGuard, ExpirationGuard],
          },
          {
            path: 'licencedegreedeletedlisttab',
            component: LicenceDegreeDeletedListComponent,
            canActivate: [LoginGuard, ExpirationGuard],
          },
        ],
      },

      {
        path: 'modelmenumain',
        component: ModelMenuComponent,
        canActivate: [LoginGuard, ExpirationGuard],
        children: [
          {
            path: 'modelmenumainlisttab',
            component: ModelMenuListTab,
            canActivate: [LoginGuard, ExpirationGuard],
          },
          {
            path: 'modelmenumaindeletedlisttab',
            component: ModelMenuDeletedListComponent,
            canActivate: [LoginGuard, ExpirationGuard],
          },
        ],
      },

      {
        path: 'operationclaim',
        component: OperationClaimComponent,
        canActivate: [LoginGuard, ExpirationGuard],
        children: [
          {
            path: 'operationclaimlisttab',
            component: OperationClaimListTab,
            canActivate: [LoginGuard, ExpirationGuard],
          },
          {
            path: 'operationclaimdeletedlisttab',
            component: OperationClaimDeletedListComponent,
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
            component: RegionDeletedListComponent,
            canActivate: [LoginGuard, ExpirationGuard],
          },
        ],
      },

      {
        path: 'taxoffice',
        component: TaxOfficeComponent,
        canActivate: [LoginGuard, ExpirationGuard],
        children: [
          {
            path: 'taxofficelisttab',
            component: TaxOfficeListTab,
            canActivate: [LoginGuard, ExpirationGuard],
          },
          {
            path: 'taxofficedeletedlisttab',
            component: TaxOfficeDeletedListComponent,
            canActivate: [LoginGuard, ExpirationGuard],
          },
        ],
      },

      {
        path: 'university',
        component: UniversityComponent,
        canActivate: [LoginGuard, ExpirationGuard],
        children: [
          {
            path: 'universitylisttab',
            component: UniversityListTab,
            canActivate: [LoginGuard, ExpirationGuard],
          },
          {
            path: 'universitydeletedlisttab',
            component: UniversityDeletedListComponent,
            canActivate: [LoginGuard, ExpirationGuard],
          },
        ],
      },

      {
        path: 'universitydepartment',
        component: UniversityDepartmentComponent,
        canActivate: [LoginGuard, ExpirationGuard],
        children: [
          {
            path: 'universitydepartmentlisttab',
            component: UniversityDepartmentListTab,
            canActivate: [LoginGuard, ExpirationGuard],
          },
          {
            path: 'universitydepartmentdeletedlisttab',
            component: UniversityDepartmentDeletedListComponent,
            canActivate: [LoginGuard, ExpirationGuard],
          },
        ],
      },

      {
        path: 'useroperationclaim',
        component: UserOperationClaimComponent,
        canActivate: [LoginGuard, ExpirationGuard],
        children: [
          {
            path: 'useroperationclaimlisttab',
            component: UserOperationClaimListTab,
            canActivate: [LoginGuard, ExpirationGuard],
          },
          {
            path: 'useroperationclaimdeletedlisttab',
            component: UserOperationClaimDeletedListComponent,
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
            component: WorkingMethodDeletedListComponent,
            canActivate: [LoginGuard, ExpirationGuard],
          },
        ],
      },

      {
        path: 'personeluser',
        component: PersonelUserComponent,
        canActivate: [LoginGuard, ExpirationGuard],
        children: [
          {
            path: 'personeluserlisttab',
            component: PersonelUserListTab,
            canActivate: [LoginGuard, ExpirationGuard],
          },
          {
            path: 'personeluserdeletedlisttab',
            component: PersonelUserDeletedListComponent,
            canActivate: [LoginGuard, ExpirationGuard],
          },
        ],
      },

      {
        path: 'personeluseraddress',
        component: PersonelUserAddressComponent,
        canActivate: [LoginGuard, ExpirationGuard],
        children: [
          {
            path: 'personeluseraddresslisttab',
            component: PersonelUserAddressListTab,
            canActivate: [LoginGuard, ExpirationGuard],
          },
          {
            path: 'personeluseraddressdeletedlisttab',
            component: PersonelUserAddressDeletedListComponent,
            canActivate: [LoginGuard, ExpirationGuard],
          },
        ],
      },

      {
        path: 'personelusercoverletter',
        component: PersonelUserCoverLetterComponent,
        canActivate: [LoginGuard, ExpirationGuard],
        children: [
          {
            path: 'personelusercoverletterlisttab',
            component: PersonelUserCoverLetterListTab,
            canActivate: [LoginGuard, ExpirationGuard],
          },
          {
            path: 'personelusercoverletterdeletedlisttab',
            component: PersonelUserCoverLetterDeletedListComponent,
            canActivate: [LoginGuard, ExpirationGuard],
          },
        ],
      },

      {
        path: 'personelusercveducation',
        component: PersonelUserCvEducationComponent,
        canActivate: [LoginGuard, ExpirationGuard],
        children: [
          {
            path: 'personelusercveducationlisttab',
            component: PersonelUserCvEducationListTab,
            canActivate: [LoginGuard, ExpirationGuard],
          },
          {
            path: 'personelusercveducationdeletedlisttab',
            component: PersonelUserCvEducationDeletedListComponent,
            canActivate: [LoginGuard, ExpirationGuard],
          },
        ],
      },

      {
        path: 'personelusercvsummary',
        component: PersonelUserCvSummaryComponent,
        canActivate: [LoginGuard, ExpirationGuard],
        children: [
          {
            path: 'personelusercvsummarylisttab',
            component: PersonelUserCvSummaryListTab,
            canActivate: [LoginGuard, ExpirationGuard],
          },
          {
            path: 'personelusercvsummarydeletedlisttab',
            component: PersonelUserCvSummaryDeletedListComponent,
            canActivate: [LoginGuard, ExpirationGuard],
          },
        ],
      },

      {
        path: 'personeluserfile',
        component: PersonelUserFileComponent,
        canActivate: [LoginGuard, ExpirationGuard],
        children: [
          {
            path: 'personeluserfilelisttab',
            component: PersonelUserFileListTab,
            canActivate: [LoginGuard, ExpirationGuard],
          },
          {
            path: 'personeluserfiledeletedlisttab',
            component: PersonelUserFileDeletedListComponent,
            canActivate: [LoginGuard, ExpirationGuard],
          },
        ],
      },

      {
        path: 'personeluserimage',
        component: PersonelUserImageComponent,
        canActivate: [LoginGuard, ExpirationGuard],
        children: [
          {
            path: 'personeluserimagelisttab',
            component: PersonelUserImageListTab,
            canActivate: [LoginGuard, ExpirationGuard],
          },
          {
            path: 'personeluserimagedeletedlisttab',
            component: PersonelUserImageDeletedListComponent,
            canActivate: [LoginGuard, ExpirationGuard],
          },
          {
            path: 'personeluserimageslidetab',
            component: PersonelUserImageSlideComponent,
            canActivate: [LoginGuard, ExpirationGuard],
          },
        ],
      },
      {
        path: 'personeluserimages/personeluserimageslide',
        component: PersonelUserImageSlideComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },

      {
        path: 'personelusercvworkexperience',
        component: PersonelUserCvWorkExperienceComponent,
        canActivate: [LoginGuard, ExpirationGuard],
        children: [
          {
            path: 'personelusercvworkexperiencelisttab',
            component: PersonelUserCvWorkExperienceListTab,
            canActivate: [LoginGuard, ExpirationGuard],
          },
          {
            path: 'personelusercvworkexperiencedeletedlisttab',
            component: PersonelUserCvWorkExperienceDeletedListComponent,
            canActivate: [LoginGuard, ExpirationGuard],
          },
        ],
      },
    ],
    canActivate: [LoginGuard, ExpirationGuard],
  },

  //{ path: '**', redirectTo: '/dashboard', pathMatch: 'full' },
];
