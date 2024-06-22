import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ClientRateComponent } from './Components/client-rate/client-rate.component';
import { LabsDemoComponent } from './Components/labs-demo/labs-demo.component';
import { LandingComponent } from './Components/landing/landing.component';
import { WorkComponent } from './Components/work/work.component';
import { CartComponent } from './Views/cart/cart.component';
import { ChangePasswordComponent } from './Views/change-password/change-password.component';
import { ContactComponent } from './Views/contact/contact.component';
import { AdminDashComponent } from './Views/Dashboards/admin-dash/admin-dash.component';
import { DoctorDashComponent } from './Views/Dashboards/doctor-dash/doctor-dash.component';
import { AppointmentsComponent } from './Views/Dashboards/lab-dash/appointments/appointments.component';
import { FeedbackComponent } from './Views/Dashboards/lab-dash/feedback/feedback.component';
import { LabDashComponent } from './Views/Dashboards/lab-dash/lab-dash.component';
import { TestDialogComponent } from './Views/Dashboards/lab-dash/lab-tests/add-test-dialog/test-dialog.component';
import { LabTestsComponent } from './Views/Dashboards/lab-dash/lab-tests/tests.component';
import { NurseDialogComponent } from './Views/Dashboards/lab-dash/nurses/add-nurse-dialog/nurse-dialog.component';
import { NursesComponent } from './Views/Dashboards/lab-dash/nurses/nurses.component';
import { NurseDashComponent } from './Views/Dashboards/nurse-dash/nurse-dash.component';
import { HomeComponent } from './Views/home/home.component';
import { LabsComponent } from './Views/labs/labs.component';
import { NotFoundComponent } from './Views/not-found/not-found.component';
import { PharmacyComponent } from './Views/pharmacies/pharmacies.component';
import { ProfileSittingComponent } from './Views/profile-sitting/profile-sitting.component';
import { TestsComponent } from './Views/tests/tests.component';
import { VerifyEmailComponent } from './Views/verify-email/verify-email.component';
import { SignupComponent } from './Views/signup/signup.component';
import { LoginComponent } from './Views/login/login.component';
import { ResetPasswordComponent } from './Views/reset-password/reset-password.component';
import { ForgetPasswordComponent } from './Views/forget-password/forget-password.component';
import { SharedModule } from '../Shared/shared.module';
import { TestDemoComponent } from './Components/test-demo/test-demo.component';
import { CheckoutComponent } from './Views/checkout/checkout.component';
import { TestDetailsComponent } from './Views/tests/test-details/test-details.component';
import { ManageDoctorsComponent } from './Views/Dashboards/admin-dash/manage-doctors/manage-doctors.component';
import { ManageLabsComponent } from './Views/Dashboards/admin-dash/manage-labs/manage-labs.component';
import { AddDoctorDialogComponent } from './Views/Dashboards/admin-dash/manage-doctors/add-doctor-dialog/add-doctor-dialog.component';
import { EditDoctorDialogComponent } from './Views/Dashboards/admin-dash/manage-doctors/edit-doctor-dialog/edit-doctor-dialog.component';
import { EditLabDialogComponent } from './Views/Dashboards/admin-dash/manage-labs/edit-lab-dialog/edit-lab-dialog.component';
import { AddLabDialogComponent } from './Views/Dashboards/admin-dash/manage-labs/add-lab-dialog/add-lab-dialog.component';
import { ManageMedicineComponent } from './Views/Dashboards/admin-dash/manage-medicine/manage-medicine.component';
import { AddMedicineDialogComponent } from './Views/Dashboards/admin-dash/manage-medicine/add-medicine-dialog/add-medicine-dialog.component';
import { EditMedicineDialogComponent } from './Views/Dashboards/admin-dash/manage-medicine/edit-medicine-dialog/edit-medicine-dialog.component';
import { EditTestDialogComponent } from './Views/Dashboards/lab-dash/lab-tests/edit-test-dialog/edit-test-dialog.component';
import { MedicineDetailsComponent } from './Views/pharmacies/medicine-details/medicine-details.component';
import { EditNurseDialogComponent } from './Views/Dashboards/lab-dash/nurses/edit-nurse-dialog/edit-nurse-dialog.component';
import { ChatComponent } from './Components/chat/chat.component';
import { register } from 'swiper/element/bundle';
import { DoctorComponent } from './Components/doctor/doctor.component';
import { AboutUsComponent } from './Views/about-us/about-us.component';
import { ClinicsComponent } from './Components/clinics/clinics.component';
register();
@NgModule({
  declarations: [
    ForgetPasswordComponent,
    ResetPasswordComponent,
    ClientRateComponent,
    LabsDemoComponent,
    LandingComponent,
    WorkComponent,
    HomeComponent,
    LabsComponent,
    PharmacyComponent,
    ContactComponent,
    CartComponent,
    NotFoundComponent,
    NurseDashComponent,
    DoctorDashComponent,
    LabDashComponent,
    TestsComponent,
    ChangePasswordComponent,
    ProfileSittingComponent,
    FeedbackComponent,
    AppointmentsComponent,
    NursesComponent,
    NurseDialogComponent,
    TestDialogComponent,
    AdminDashComponent,
    LabTestsComponent,
    VerifyEmailComponent,
    SignupComponent,
    LoginComponent,
    TestDemoComponent,
    CheckoutComponent,
    TestDetailsComponent,
    ManageDoctorsComponent,
    ManageLabsComponent,
    AddDoctorDialogComponent,
    EditDoctorDialogComponent,
    EditLabDialogComponent,
    AddLabDialogComponent,
    ManageMedicineComponent,
    AddMedicineDialogComponent,
    EditMedicineDialogComponent,
    EditTestDialogComponent,
    MedicineDetailsComponent,
    EditNurseDialogComponent,
    ChatComponent,
    AboutUsComponent,
    ClinicsComponent,
    DoctorComponent,
  
  ],
  imports: [SharedModule],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FeaturesModule {}
