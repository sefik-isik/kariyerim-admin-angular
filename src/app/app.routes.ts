import { CompanyUserComponent } from './components/companyUserComponent/companyUser/companyUser.component';
import { Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';

import { LoginComponent } from './components/login/login.component';
import { LoginGuard } from './guards/login.guard';
import { RegisterComponent } from './components/register/register.component';
import { UpdatePasswordComponent } from './components/updatePassword/updatePassword.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CompanyUserAddComponent } from './components/companyUserComponent/companyUserAdd/companyUserAdd.component';
import { ExpirationGuard } from './guards/expiration.guard';
import { StatusGuard } from './guards/status.guard';
import { CompanyUserUpdateComponent } from './components/companyUserComponent/companyUserUpdate/companyUserUpdate.component';
import { CompanyUserOfDeletedComponent } from './components/companyUserComponent/companyUserOfDeleted/companyUserOfDeleted.component';
import { CompanyUserAddressComponent } from './components/companyUserAddressComponent/companyUserAddress/companyUserAddress.component';
import { CompanyUserAddressOfDeletedComponent } from './components/companyUserAddressComponent/companyUserAddressOfDeleted/companyUserAddressOfDeleted.component';
import { CompanyUserAddressAddComponent } from './components/companyUserAddressComponent/companyUserAddressAdd/companyUserAddressAdd.component';
import { CompanyUserAddressUpdateComponent } from './components/companyUserAddressComponent/companyUserAddressUpdate/companyUserAddressUpdate.component';
import { CompanyUserDepartmentComponent } from './components/companyUserDepartmentCompenent/companyUserDepartment/companyUserDepartment.component';
import { CompanyUserDepartmentAddComponent } from './components/companyUserDepartmentCompenent/companyUserDepartmentAdd/companyUserDepartmentAdd.component';
import { CompanyUserDepartmentOfDeletedComponent } from './components/companyUserDepartmentCompenent/CompanyUserDepartmentOfDeleted/CompanyUserDepartmentOfDeleted.component';
import { CompanyUserDepartmentUpdateComponent } from './components/companyUserDepartmentCompenent/companyUserDepartmentUpdate/companyUserDepartmentUpdate.component';
import { CompanyUserFileComponent } from './components/companyUserFileComponent/companyUserFile/companyUserFile.component';
import { CompanyUserFileAddComponent } from './components/companyUserFileComponent/companyUserFileAdd/companyUserFileAdd.component';
import { CompanyUserFileOfDeletedComponent } from './components/companyUserFileComponent/companyUserFileOfDeleted/companyUserFileOfDeleted.component';
import { CompanyUserFileUpdateComponent } from './components/companyUserFileComponent/companyUserFileUpdate/companyUserFileUpdate.component';
import { CompanyUserImageComponent } from './components/companyUserImageComponent/companyUserImage/companyUserImage.component';
import { CompanyUserImageAddComponent } from './components/companyUserImageComponent/companyUserImageAdd/companyUserImageAdd.component';
import { CompanyUserImageOfDeletedComponent } from './components/companyUserImageComponent/companyUserImageOfDeleted/companyUserImageOfDeleted.component';
import { CompanyUserImageUpdateComponent } from './components/companyUserImageComponent/companyUserImageUpdate/companyUserImageUpdate.component';
import { CompanyUserImageSlideComponent } from './components/companyUserImageComponent/companyUserImageSlide/companyUserImageSlide.component';
import { SectorComponent } from './components/sectorComponent/sector/sector.component';
import { SectorOfDeletedComponent } from './components/sectorComponent/sectorOfDeleted/sectorOfDeleted.component';
import { SectorAddComponent } from './components/sectorComponent/sectorAdd/sectorAdd.component';
import { SectorUpdateComponent } from './components/sectorComponent/sectorUpdate/sectorUpdate.component';
import { CountryComponent } from './components/countryComponent/country/country.component';
import { CountryAddComponent } from './components/countryComponent/countryAdd/countryAdd.component';
import { CountryOfDeletedComponent } from './components/countryComponent/countryOfDeleted/countryOfDeleted.component';
import { CountryUpdateComponent } from './components/countryComponent/countryUpdate/countryUpdate.component';
import { PersonelUserCvComponent } from './components/personelUserCvComponent/personelUserCv/personelUserCv.component';
import { PersonelUserCvAddComponent } from './components/personelUserCvComponent/personelUserCvAdd/personelUserCvAdd.component';
import { PersonelUserCvOfDeletedComponent } from './components/personelUserCvComponent/personelUserCvOfDeleted/personelUserCvOfDeleted.component';
import { PersonelUserCvUpdateComponent } from './components/personelUserCvComponent/personelUserCvUpdate/personelUserCvUpdate.component';
import { DriverLicenceComponent } from './components/driverlicenceComponent/driverLicence/driverLicence.component';
import { DriverLicenceAddComponent } from './components/driverlicenceComponent/DriverLicenceAdd/DriverLicenceAdd.component';
import { DriverLicenceOfDeletedComponent } from './components/driverlicenceComponent/DriverLicenceOfDeleted/DriverLicenceOfDeleted.component';
import { DriverLicenceUpdateComponent } from './components/driverlicenceComponent/DriverLicenceUpdate/DriverLicenceUpdate.component';
import { FacultyComponent } from './components/facultyComponent/faculty/faculty.component';
import { FacultyAddComponent } from './components/facultyComponent/facultyAdd/facultyAdd.component';
import { FacultyOfDeletedComponent } from './components/facultyComponent/facultyOfDeleted/facultyOfDeleted.component';
import { FacultyUpdateComponent } from './components/facultyComponent/facultyUpdate/facultyUpdate.component';
import { LanguageLevelComponent } from './components/languageLevelComponent/languageLevel/languageLevel.component';
import { LanguageLevelAddComponent } from './components/languageLevelComponent/languageLevelAdd/languageLevelAdd.component';
import { LanguageLevelOfDeletedComponent } from './components/languageLevelComponent/languageLevelOfDeleted/languageLevelOfDeleted.component';
import { LanguageLevelUpdateComponent } from './components/languageLevelComponent/languageLevelUpdate/languageLevelUpdate.component';
import { LanguageComponent } from './components/languageComponent/language/language.component';
import { LanguageAddComponent } from './components/languageComponent/languageAdd/languageAdd.component';
import { LanguageOfDeletedComponent } from './components/languageComponent/languageOfDeleted/languageOfDeleted.component';
import { LanguageUpdateComponent } from './components/languageComponent/languageUpdate/languageUpdate.component';
import { LicenceDegreeComponent } from './components/licenceDegreeComponent/licenceDegree/licenceDegree.component';
import { LicenceDegreeAddComponent } from './components/licenceDegreeComponent/licenceDegreeAdd/licenceDegreeAdd.component';
import { LicenceDegreeOfDeletedComponent } from './components/licenceDegreeComponent/licenceDegreeOfDeleted/licenceDegreeOfDeleted.component';
import { LicenceDegreeUpdateComponent } from './components/licenceDegreeComponent/licenceDegreeUpdate/licenceDegreeUpdate.component';
import { ModelMenuAddComponent } from './components/modelMenuComponent/modelMenuAdd/modelMenuAdd.component';
import { ModelMenuOfDeletedComponent } from './components/modelMenuComponent/modelMenuOfDeleted/modelMenuOfDeleted.component';
import { ModelMenuUpdateComponent } from './components/modelMenuComponent/modelMenuUpdate/modelMenuUpdate.component';
import { ModelMenuListComponent } from './components/modelMenuComponent/modelMenuList/modelMenuList.component';
import { OperationClaimComponent } from './components/operationClaimComponent/operationClaim/operationClaim.component';
import { OperationClaimAddComponent } from './components/operationClaimComponent/operationClaimAdd/operationClaimAdd.component';
import { OperationClaimOfDeletedComponent } from './components/operationClaimComponent/operationClaimOfDeleted/operationClaimOfDeleted.component';
import { OperationClaimUpdateComponent } from './components/operationClaimComponent/operationClaimUpdate/operationClaimUpdate.component';
import { RegionComponent } from './components/regionComponent/region/region.component';
import { RegionAddComponent } from './components/regionComponent/regionAdd/regionAdd.component';
import { RegionOfDeletedComponent } from './components/regionComponent/regionOfDeleted/regionOfDeleted.component';
import { RegionUpdateComponent } from './components/regionComponent/regionUpdate/regionUpdate.component';
import { TaxOfficeComponent } from './components/taxOfficeComponent/taxOffice/taxOffice.component';
import { TaxOfficeAddComponent } from './components/taxOfficeComponent/taxOfficeAdd/taxOfficeAdd.component';
import { TaxOfficeOfDeletedComponent } from './components/taxOfficeComponent/taxOfficeOfDeleted/taxOfficeOfDeleted.component';
import { TaxOfficeUpdateComponent } from './components/taxOfficeComponent/taxOfficeUpdate/taxOfficeUpdate.component';
import { UniversityComponent } from './components/universityComponent/university/university.component';
import { UniversityAddComponent } from './components/universityComponent/universityAdd/universityAdd.component';
import { UniversityOfDeletedComponent } from './components/universityComponent/universityOfDeleted/universityOfDeleted.component';
import { UniversityUpdateComponent } from './components/universityComponent/universityUpdate/universityUpdate.component';
import { UniversityDepartmentComponent } from './components/universityDepartmentComponent/universityDepartment/universityDepartment.component';
import { UniversityDepartmentAddComponent } from './components/universityDepartmentComponent/universityDepartmentAdd/universityDepartmentAdd.component';
import { UniversityDepartmentOfDeletedComponent } from './components/universityDepartmentComponent/universityDepartmentOfDeleted/universityDepartmentOfDeleted.component';
import { UniversityDepartmentUpdateComponent } from './components/universityDepartmentComponent/universityDepartmentUpdate/universityDepartmentUpdate.component';
import { UserOperationClaimComponent } from './components/userOperationClaimComponent/userOperationClaim/userOperationClaim.component';
import { UserOperationClaimAddComponent } from './components/userOperationClaimComponent/userOperationClaimAdd/userOperationClaimAdd.component';
import { UserOperationClaimOfDeletedComponent } from './components/userOperationClaimComponent/userOperationClaimOfDeleted/userOperationClaimOfDeleted.component';
import { UserOperationClaimUpdateComponent } from './components/userOperationClaimComponent/userOperationClaimUpdate/userOperationClaimUpdate.component';
import { WorkingMethodComponent } from './components/workingMethodComponent/workingMethod/workingMethod.component';
import { WorkingMethodAddComponent } from './components/workingMethodComponent/workingMethodAdd/workingMethodAdd.component';
import { WorkingMethodOfDeletedComponent } from './components/workingMethodComponent/workingMethodOfDeleted/workingMethodOfDeleted.component';
import { WorkingMethodUpdateComponent } from './components/workingMethodComponent/workingMethodUpdate/workingMethodUpdate.component';
import { PersonelUserMainComponent } from './components/personelUserMain/personelUserMain.component';
import { CompanyUserMainComponent } from './components/companyUserMain/companyUserMain.component';
import { PersonelUserComponent } from './components/personelUserComponent/personelUser/personelUser.component';
import { PersonelUserAddComponent } from './components/personelUserComponent/personelUserAdd/personelUserAdd.component';
import { PersonelUserOfDeletedComponent } from './components/personelUserComponent/personelUserOfDeleted/personelUserOfDeleted.component';
import { PersonelUserUpdateComponent } from './components/personelUserComponent/personelUserUpdate/personelUserUpdate.component';

//-----------------
import { AllUserComponent } from './components/allUserComponent/allUser/allUser.component';
import { AllUserListTab } from './components/allUserComponent/allUser/allUserListTab';
import { AllUserDeletedListTab } from './components/allUserComponent/allUser/allUserDeletedListTab';
//-----------------
import { CityComponent } from './components/cityComponent/city/city.component';
import { CityListTab } from './components/cityComponent/city/cityListTab';
import { CityDeletedListComponent } from './components/cityComponent/cityDeletedList/cityDeletedList.component';
import { PersonelUserAddressComponent } from './components/personelUserAddressComponent/personelUserAddress/personelUserAddress.component';
import { PersonelUserAddressAddComponent } from './components/personelUserAddressComponent/personelUserAddressAdd/personelUserAddressAdd.component';
import { PersonelUserAddressOfDeletedComponent } from './components/personelUserAddressComponent/personelUserAddressOfDeleted/personelUserAddressOfDeleted.component';
import { PersonelUserAddressUpdateComponent } from './components/personelUserAddressComponent/personelUserAddressUpdate/personelUserAddressUpdate.component';
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
        path: 'useroperationclaims/useroperationclaimadd',
        component: UserOperationClaimAddComponent,
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
    ],
    canActivate: [LoginGuard, ExpirationGuard],
  },

  //{ path: '**', redirectTo: '/dashboard', pathMatch: 'full' },
];
