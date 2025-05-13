import { CompanyUserComponent } from './pages/companyUser/companyUser/companyUser.component';
import { Routes } from '@angular/router';

import { CompanyUserAddComponent } from './pages/companyUser/companyUserAdd/companyUserAdd.component';
import { ExpirationGuard } from './guards/expiration.guard';
import { StatusGuard } from './guards/status.guard';
import { CompanyUserUpdateComponent } from './pages/companyUser/companyUserUpdate/companyUserUpdate.component';
import { CompanyUserOfDeletedComponent } from './pages/companyUser/companyUserOfDeleted/companyUserOfDeleted.component';
import { CompanyUserAddressComponent } from './pages/companyUserAddress/companyUserAddress/companyUserAddress.component';
import { CompanyUserAddressOfDeletedComponent } from './pages/companyUserAddress/companyUserAddressOfDeleted/companyUserAddressOfDeleted.component';
import { CompanyUserAddressAddComponent } from './pages/companyUserAddress/companyUserAddressAdd/companyUserAddressAdd.component';
import { CompanyUserAddressUpdateComponent } from './pages/companyUserAddress/companyUserAddressUpdate/companyUserAddressUpdate.component';
import { CompanyUserDepartmentComponent } from './pages/companyUserDepartment/companyUserDepartment/companyUserDepartment.component';
import { CompanyUserDepartmentAddComponent } from './pages/companyUserDepartment/companyUserDepartmentAdd/companyUserDepartmentAdd.component';
import { CompanyUserDepartmentOfDeletedComponent } from './pages/companyUserDepartment/CompanyUserDepartmentOfDeleted/CompanyUserDepartmentOfDeleted.component';
import { CompanyUserDepartmentUpdateComponent } from './pages/companyUserDepartment/companyUserDepartmentUpdate/companyUserDepartmentUpdate.component';
import { CompanyUserFileComponent } from './pages/companyUserFile/companyUserFile/companyUserFile.component';
import { CompanyUserFileAddComponent } from './pages/companyUserFile/companyUserFileAdd/companyUserFileAdd.component';
import { CompanyUserFileOfDeletedComponent } from './pages/companyUserFile/companyUserFileOfDeleted/companyUserFileOfDeleted.component';
import { CompanyUserFileUpdateComponent } from './pages/companyUserFile/companyUserFileUpdate/companyUserFileUpdate.component';
import { CompanyUserImageComponent } from './pages/companyUserImage/companyUserImage/companyUserImage.component';
import { CompanyUserImageAddComponent } from './pages/companyUserImage/companyUserImageAdd/companyUserImageAdd.component';
import { CompanyUserImageOfDeletedComponent } from './pages/companyUserImage/companyUserImageOfDeleted/companyUserImageOfDeleted.component';
import { CompanyUserImageUpdateComponent } from './pages/companyUserImage/companyUserImageUpdate/companyUserImageUpdate.component';
import { CompanyUserImageSlideComponent } from './pages/companyUserImage/companyUserImageSlide/companyUserImageSlide.component';
import { SectorComponent } from './pages/sector/sector/sector.component';
import { SectorOfDeletedComponent } from './pages/sector/sectorOfDeleted/sectorOfDeleted.component';
import { SectorAddComponent } from './pages/sector/sectorAdd/sectorAdd.component';
import { SectorUpdateComponent } from './pages/sector/sectorUpdate/sectorUpdate.component';
import { CountryComponent } from './pages/country/country/country.component';
import { CountryAddComponent } from './pages/country/countryAdd/countryAdd.component';
import { CountryOfDeletedComponent } from './pages/country/countryOfDeleted/countryOfDeleted.component';
import { CountryUpdateComponent } from './pages/country/countryUpdate/countryUpdate.component';
import { PersonelUserCvComponent } from './pages/personelUserCv/personelUserCv/personelUserCv.component';
import { PersonelUserCvAddComponent } from './pages/personelUserCv/personelUserCvAdd/personelUserCvAdd.component';
import { PersonelUserCvOfDeletedComponent } from './pages/personelUserCv/personelUserCvOfDeleted/personelUserCvOfDeleted.component';
import { PersonelUserCvUpdateComponent } from './pages/personelUserCv/personelUserCvUpdate/personelUserCvUpdate.component';
import { DriverLicenceComponent } from './pages/driverlicence/driverLicence/driverLicence.component';
import { DriverLicenceAddComponent } from './pages/driverlicence/DriverLicenceAdd/DriverLicenceAdd.component';
import { DriverLicenceOfDeletedComponent } from './pages/driverlicence/DriverLicenceOfDeleted/DriverLicenceOfDeleted.component';
import { DriverLicenceUpdateComponent } from './pages/driverlicence/DriverLicenceUpdate/DriverLicenceUpdate.component';
import { FacultyComponent } from './pages/faculty/faculty/faculty.component';
import { FacultyAddComponent } from './pages/faculty/facultyAdd/facultyAdd.component';
import { FacultyOfDeletedComponent } from './pages/faculty/facultyOfDeleted/facultyOfDeleted.component';
import { FacultyUpdateComponent } from './pages/faculty/facultyUpdate/facultyUpdate.component';
import { LanguageLevelComponent } from './pages/languageLevel/languageLevel/languageLevel.component';
import { LanguageLevelAddComponent } from './pages/languageLevel/languageLevelAdd/languageLevelAdd.component';
import { LanguageLevelOfDeletedComponent } from './pages/languageLevel/languageLevelOfDeleted/languageLevelOfDeleted.component';
import { LanguageLevelUpdateComponent } from './pages/languageLevel/languageLevelUpdate/languageLevelUpdate.component';
import { LanguageComponent } from './pages/language/language/language.component';
import { LanguageAddComponent } from './pages/language/languageAdd/languageAdd.component';
import { LanguageOfDeletedComponent } from './pages/language/languageOfDeleted/languageOfDeleted.component';
import { LanguageUpdateComponent } from './pages/language/languageUpdate/languageUpdate.component';
import { LicenceDegreeComponent } from './pages/licenceDegree/licenceDegree/licenceDegree.component';
import { LicenceDegreeAddComponent } from './pages/licenceDegree/licenceDegreeAdd/licenceDegreeAdd.component';
import { LicenceDegreeOfDeletedComponent } from './pages/licenceDegree/licenceDegreeOfDeleted/licenceDegreeOfDeleted.component';
import { LicenceDegreeUpdateComponent } from './pages/licenceDegree/licenceDegreeUpdate/licenceDegreeUpdate.component';
import { ModelMenuAddComponent } from './pages/modelMenu/modelMenuAdd/modelMenuAdd.component';
import { ModelMenuOfDeletedComponent } from './pages/modelMenu/modelMenuOfDeleted/modelMenuOfDeleted.component';
import { ModelMenuUpdateComponent } from './pages/modelMenu/modelMenuUpdate/modelMenuUpdate.component';
import { ModelMenuListComponent } from './pages/modelMenu/modelMenuList/modelMenuList.component';
import { OperationClaimComponent } from './pages/operationClaim/operationClaim/operationClaim.component';
import { OperationClaimAddComponent } from './pages/operationClaim/operationClaimAdd/operationClaimAdd.component';
import { OperationClaimOfDeletedComponent } from './pages/operationClaim/operationClaimOfDeleted/operationClaimOfDeleted.component';
import { OperationClaimUpdateComponent } from './pages/operationClaim/operationClaimUpdate/operationClaimUpdate.component';
import { RegionComponent } from './pages/region/region/region.component';
import { RegionAddComponent } from './pages/region/regionAdd/regionAdd.component';
import { RegionOfDeletedComponent } from './pages/region/regionOfDeleted/regionOfDeleted.component';
import { RegionUpdateComponent } from './pages/region/regionUpdate/regionUpdate.component';
import { TaxOfficeComponent } from './pages/taxOffice/taxOffice/taxOffice.component';
import { TaxOfficeAddComponent } from './pages/taxOffice/taxOfficeAdd/taxOfficeAdd.component';
import { TaxOfficeOfDeletedComponent } from './pages/taxOffice/taxOfficeOfDeleted/taxOfficeOfDeleted.component';
import { TaxOfficeUpdateComponent } from './pages/taxOffice/taxOfficeUpdate/taxOfficeUpdate.component';
import { UniversityComponent } from './pages/university/university/university.component';
import { UniversityAddComponent } from './pages/university/universityAdd/universityAdd.component';
import { UniversityOfDeletedComponent } from './pages/university/universityOfDeleted/universityOfDeleted.component';
import { UniversityUpdateComponent } from './pages/university/universityUpdate/universityUpdate.component';
import { UniversityDepartmentComponent } from './pages/universityDepartment/universityDepartment/universityDepartment.component';
import { UniversityDepartmentAddComponent } from './pages/universityDepartment/universityDepartmentAdd/universityDepartmentAdd.component';
import { UniversityDepartmentOfDeletedComponent } from './pages/universityDepartment/universityDepartmentOfDeleted/universityDepartmentOfDeleted.component';
import { UniversityDepartmentUpdateComponent } from './pages/universityDepartment/universityDepartmentUpdate/universityDepartmentUpdate.component';
import { UserOperationClaimComponent } from './pages/userOperationClaim/userOperationClaim/userOperationClaim.component';
import { UserOperationClaimOfDeletedComponent } from './pages/userOperationClaim/userOperationClaimOfDeleted/userOperationClaimOfDeleted.component';
import { UserOperationClaimUpdateComponent } from './pages/userOperationClaim/userOperationClaimUpdate/userOperationClaimUpdate.component';
import { WorkingMethodComponent } from './pages/workingMethod/workingMethod/workingMethod.component';
import { WorkingMethodAddComponent } from './pages/workingMethod/workingMethodAdd/workingMethodAdd.component';
import { WorkingMethodOfDeletedComponent } from './pages/workingMethod/workingMethodOfDeleted/workingMethodOfDeleted.component';
import { WorkingMethodUpdateComponent } from './pages/workingMethod/workingMethodUpdate/workingMethodUpdate.component';
import { PersonelUserMainComponent } from './pages/personelUser/personelUserMain/personelUserMain.component';
import { CompanyUserMainComponent } from './pages/companyUser/companyUserMain/companyUserMain.component';
import { PersonelUserComponent } from './pages/personelUser/personelUser/personelUser.component';
import { PersonelUserAddComponent } from './pages/personelUser/personelUserAdd/personelUserAdd.component';
import { PersonelUserOfDeletedComponent } from './pages/personelUser/personelUserOfDeleted/personelUserOfDeleted.component';
import { PersonelUserUpdateComponent } from './pages/personelUser/personelUserUpdate/personelUserUpdate.component';

//-----------------
import { AllUserComponent } from './pages/allUser/allUser/allUser.component';
import { AllUserListTab } from './pages/allUser/allUser/allUserListTab';
import { AllUserDeletedListTab } from './pages/allUser/allUser/allUserDeletedListTab';
//-----------------
import { CityComponent } from './pages/city/city/city.component';
import { CityListTab } from './pages/city/city/cityListTab';
import { CityDeletedListComponent } from './pages/city/cityDeletedList/cityDeletedList.component';
import { PersonelUserAddressComponent } from './pages/personelUserAddress/personelUserAddress/personelUserAddress.component';
import { PersonelUserAddressAddComponent } from './pages/personelUserAddress/personelUserAddressAdd/personelUserAddressAdd.component';
import { PersonelUserAddressOfDeletedComponent } from './pages/personelUserAddress/personelUserAddressOfDeleted/personelUserAddressOfDeleted.component';
import { PersonelUserAddressUpdateComponent } from './pages/personelUserAddress/personelUserAddressUpdate/personelUserAddressUpdate.component';
import { PersonelUserCoverLetterListComponent } from './pages/personelUserCoverLetter/personelUserCoverLetterList/personelUserCoverLetterList.component';
import { PersonelUserCoverLetterAddComponent } from './pages/personelUserCoverLetter/personelUserCoverLetterAdd/personelUserCoverLetterAdd.component';
import { PersonelUserCoverLetterDeletedListComponent } from './pages/personelUserCoverLetter/personelUserCoverLetterDeletedList/personelUserCoverLetterDeletedList.component';
import { PersonelUserCoverLetterUpdateComponent } from './pages/personelUserCoverLetter/personelUserCoverLetterUpdate/personelUserCoverLetterUpdate.component';
import { PersonelUserCvEducationListComponent } from './pages/personelUserCvEducation/personelUserCvEducationList/personelUserCvEducationList.component';
import { PersonelUserCvEducationAddComponent } from './pages/personelUserCvEducation/personelUserCvEducationAdd/personelUserCvEducationAdd.component';
import { PersonelUserCvEducationDeletedListComponent } from './pages/personelUserCvEducation/personelUserCvEducationDeletedList/personelUserCvEducationDeletedList.component';
import { PersonelUserCvEducationUpdateComponent } from './pages/personelUserCvEducation/personelUserCvEducationUpdate/personelUserCvEducationUpdate.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MainComponent } from './components/main/main.component';
import { LoginGuard } from './guards/login.guard';
import { UpdatePasswordComponent } from './components/updatePassword/updatePassword.component';
import { PersonelUserCvSummaryListComponent } from './pages/personelUserCvSummary/PersonelUserCvSummaryList/PersonelUserCvSummaryList.component';
import { PersonelUserCvSummaryAddComponent } from './pages/personelUserCvSummary/PersonelUserCvSummaryAdd/PersonelUserCvSummaryAdd.component';
import { PersonelUserCvSummaryDeletedListComponent } from './pages/personelUserCvSummary/PersonelUserCvSummaryDeletedList/PersonelUserCvSummaryDeletedList.component';
import { PersonelUserCvSummaryUpdateComponent } from './pages/personelUserCvSummary/PersonelUserCvSummaryUpdate/PersonelUserCvSummaryUpdate.component';
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
        path: 'allusers',
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
        path: 'cities',
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
        path: 'companyusers',
        component: CompanyUserComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },
      {
        path: 'companyusers/companyuseradd',
        component: CompanyUserAddComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },
      {
        path: 'companyusers/companyuserupdate/:companyUserId',
        component: CompanyUserUpdateComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },
      {
        path: 'companyusers/companyuserofdeleted',
        component: CompanyUserOfDeletedComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },
      {
        path: 'companyuseraddresses',
        component: CompanyUserAddressComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },
      {
        path: 'companyuseraddresses/companyuseraddressofdeleted',
        component: CompanyUserAddressOfDeletedComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },
      {
        path: 'companyuseraddresses/companyuseraddressadd',
        component: CompanyUserAddressAddComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },
      {
        path: 'companyuseraddresses/companyuseraddressupdate/:companyuseraddressId',
        component: CompanyUserAddressUpdateComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },
      {
        path: 'companyuserdepartments',
        component: CompanyUserDepartmentComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },
      {
        path: 'companyuserdepartments/companyuserdepartmentadd',
        component: CompanyUserDepartmentAddComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },
      {
        path: 'companyuserdepartments/companyuserdepartmentofdeleted',
        component: CompanyUserDepartmentOfDeletedComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },
      {
        path: 'companyuserdepartments/companyuserdepartmentupdate/:companyuseraddressId',
        component: CompanyUserDepartmentUpdateComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },
      {
        path: 'companyuserfiles',
        component: CompanyUserFileComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },
      {
        path: 'companyuserfiles/companyuserfileadd',
        component: CompanyUserFileAddComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },
      {
        path: 'companyuserfiles/companyuserfileofdeleted',
        component: CompanyUserFileOfDeletedComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },
      {
        path: 'companyuserfiles/companyuserfileupdate/:companyuserfileId',
        component: CompanyUserFileUpdateComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },
      {
        path: 'companyuserimages',
        component: CompanyUserImageComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },
      {
        path: 'companyuserimages/companyuserimageadd',
        component: CompanyUserImageAddComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },
      {
        path: 'companyuserimages/companyuserimageofdeleted',
        component: CompanyUserImageOfDeletedComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },
      {
        path: 'companyuserimages/companyuserimageupdate/:companyuserimageId',
        component: CompanyUserImageUpdateComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },
      {
        path: 'companyuserimages/companyuserimageslide',
        component: CompanyUserImageSlideComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },
      {
        path: 'sectors',
        component: SectorComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },
      {
        path: 'sectors/sectorofdeleted',
        component: SectorOfDeletedComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },
      {
        path: 'sectors/sectoradd',
        component: SectorAddComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },
      {
        path: 'sectors/sectorupdate/:sectorId',
        component: SectorUpdateComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },
      {
        path: 'countries',
        component: CountryComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },
      {
        path: 'countries/countryadd',
        component: CountryAddComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },
      {
        path: 'countries/countryofdeleted',
        component: CountryOfDeletedComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },
      {
        path: 'countries/countryupdate/:countryId',
        component: CountryUpdateComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },
      {
        path: 'personelusercvs',
        component: PersonelUserCvComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },
      {
        path: 'personelusercvs/personelusercvadd',
        component: PersonelUserCvAddComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },
      {
        path: 'personelusercvs/personelusercvofdeleted',
        component: PersonelUserCvOfDeletedComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },
      {
        path: 'personelusercvs/personelusercvupdate/:personelusercvId',
        component: PersonelUserCvUpdateComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },
      {
        path: 'driverlicences',
        component: DriverLicenceComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },
      {
        path: 'driverlicences/driverlicenceadd',
        component: DriverLicenceAddComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },
      {
        path: 'driverlicences/driverlicenceofdeleted',
        component: DriverLicenceOfDeletedComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },
      {
        path: 'driverlicences/driverlicenceupdate/:driverlicenceId',
        component: DriverLicenceUpdateComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },
      {
        path: 'faculties',
        component: FacultyComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },
      {
        path: 'faculties/facultyadd',
        component: FacultyAddComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },
      {
        path: 'faculties/facultyofdeleted',
        component: FacultyOfDeletedComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },
      {
        path: 'faculties/facultyupdate/:facultyId',
        component: FacultyUpdateComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },
      {
        path: 'languagelevels',
        component: LanguageLevelComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },
      {
        path: 'languagelevels/languageleveladd',
        component: LanguageLevelAddComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },
      {
        path: 'languagelevels/languagelevelofdeleted',
        component: LanguageLevelOfDeletedComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },
      {
        path: 'languagelevels/languagelevelupdate/:languagelevelId',
        component: LanguageLevelUpdateComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },
      {
        path: 'languages',
        component: LanguageComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },
      {
        path: 'languages/languageadd',
        component: LanguageAddComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },
      {
        path: 'languages/languageofdeleted',
        component: LanguageOfDeletedComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },
      {
        path: 'languages/languageupdate/:languageId',
        component: LanguageUpdateComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },
      {
        path: 'licencedegrees',
        component: LicenceDegreeComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },
      {
        path: 'licencedegrees/licencedegreeadd',
        component: LicenceDegreeAddComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },
      {
        path: 'licencedegrees/licencedegreeofdeleted',
        component: LicenceDegreeOfDeletedComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },
      {
        path: 'licencedegrees/licencedegreeupdate/:licencedegreeId',
        component: LicenceDegreeUpdateComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },
      {
        path: 'modelmenulists',
        component: ModelMenuListComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },
      {
        path: 'modelmenulists/modelmenuadd',
        component: ModelMenuAddComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },
      {
        path: 'modelmenulists/modelmenuofdeleted',
        component: ModelMenuOfDeletedComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },
      {
        path: 'modelmenulists/modelmenuupdate/:modelmenuId',
        component: ModelMenuUpdateComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },
      {
        path: 'operationclaims',
        component: OperationClaimComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },
      {
        path: 'operationclaims/operationclaimadd',
        component: OperationClaimAddComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },
      {
        path: 'operationclaims/operationclaimofdeleted',
        component: OperationClaimOfDeletedComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },
      {
        path: 'operationclaims/operationclaimupdate/:operationclaimId',
        component: OperationClaimUpdateComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },
      {
        path: 'regions',
        component: RegionComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },
      {
        path: 'regions/regionadd',
        component: RegionAddComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },
      {
        path: 'regions/regionofdeleted',
        component: RegionOfDeletedComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },
      {
        path: 'regions/regionupdate/:regionId',
        component: RegionUpdateComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },
      {
        path: 'taxoffices',
        component: TaxOfficeComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },
      {
        path: 'taxoffices/taxofficeadd',
        component: TaxOfficeAddComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },
      {
        path: 'taxoffices/taxofficeofdeleted',
        component: TaxOfficeOfDeletedComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },
      {
        path: 'taxoffices/taxofficeupdate/:taxofficeId',
        component: TaxOfficeUpdateComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },
      {
        path: 'universities',
        component: UniversityComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },
      {
        path: 'universities/universityadd',
        component: UniversityAddComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },
      {
        path: 'universities/universityofdeleted',
        component: UniversityOfDeletedComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },
      {
        path: 'universities/universityupdate/:universityId',
        component: UniversityUpdateComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },
      {
        path: 'universitydepartments',
        component: UniversityDepartmentComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },
      {
        path: 'universitydepartments/universitydepartmentadd',
        component: UniversityDepartmentAddComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },
      {
        path: 'universitydepartments/universitydepartmentofdeleted',
        component: UniversityDepartmentOfDeletedComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },
      {
        path: 'universitydepartments/universitydepartmentupdate/:universitydepartmentId',
        component: UniversityDepartmentUpdateComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },
      {
        path: 'useroperationclaims',
        component: UserOperationClaimComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },
      {
        path: 'useroperationclaims/useroperationclaimofdeleted',
        component: UserOperationClaimOfDeletedComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },
      {
        path: 'useroperationclaims/useroperationclaimupdate/:useroperationclaimId',
        component: UserOperationClaimUpdateComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },
      {
        path: 'workingmethods',
        component: WorkingMethodComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },
      {
        path: 'workingmethods/workingmethodadd',
        component: WorkingMethodAddComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },
      {
        path: 'workingmethods/workingmethodofdeleted',
        component: WorkingMethodOfDeletedComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },
      {
        path: 'workingmethods/workingmethodupdate/:workingmethodId',
        component: WorkingMethodUpdateComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },
      {
        path: 'personelusers',
        component: PersonelUserComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },
      {
        path: 'personelusers/personeluseradd',
        component: PersonelUserAddComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },
      {
        path: 'personelusers/personeluserofdeleted',
        component: PersonelUserOfDeletedComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },
      {
        path: 'personelusers/personeluserupdate/:personeluserId',
        component: PersonelUserUpdateComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },
      {
        path: 'personeluseraddresses',
        component: PersonelUserAddressComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },
      {
        path: 'personeluseraddresses/personeluseraddressadd',
        component: PersonelUserAddressAddComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },
      {
        path: 'personeluseraddresses/personeluseraddressofdeleted',
        component: PersonelUserAddressOfDeletedComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },
      {
        path: 'personeluseraddresses/personeluseraddressupdate/:personeluseraddressId',
        component: PersonelUserAddressUpdateComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },
      {
        path: 'personelusercoverletters',
        component: PersonelUserCoverLetterListComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },
      {
        path: 'personelusercoverletters/personelusercoverletteradd',
        component: PersonelUserCoverLetterAddComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },
      {
        path: 'personelusercoverletters/personelusercoverletterdeletedlist',
        component: PersonelUserCoverLetterDeletedListComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },
      {
        path: 'personelusercoverletters/personelusercoverletterupdate/:personelusercoverletterId',
        component: PersonelUserCoverLetterUpdateComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },
      {
        path: 'personelusercveducations',
        component: PersonelUserCvEducationListComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },
      {
        path: 'personelusercveducations/personelusercveducationadd',
        component: PersonelUserCvEducationAddComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },
      {
        path: 'personelusercveducations/personelusercveducationdeletedlist',
        component: PersonelUserCvEducationDeletedListComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },
      {
        path: 'personelusercveducations/personelusercveducationupdate/:personelusercveducationId',
        component: PersonelUserCvEducationUpdateComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },
      {
        path: 'personelusercvsummaries',
        component: PersonelUserCvSummaryListComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },
      {
        path: 'personelusercvsummaries/personelusercvsummaryadd',
        component: PersonelUserCvSummaryAddComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },
      {
        path: 'personelusercvsummaries/personelusercvsummarydeletedlist',
        component: PersonelUserCvSummaryDeletedListComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },
      {
        path: 'personelusercvsummaries/personelusercvsummaryupdate/:personelusercvsummaryId',
        component: PersonelUserCvSummaryUpdateComponent,
        canActivate: [LoginGuard, ExpirationGuard],
      },
    ],
    canActivate: [LoginGuard, ExpirationGuard],
  },

  //{ path: '**', redirectTo: '/dashboard', pathMatch: 'full' },
];
