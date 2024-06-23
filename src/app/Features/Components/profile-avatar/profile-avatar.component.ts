import { Component, inject, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Core/Services/auth.service';

@Component({
  selector: 'app-profile-avatar',
  templateUrl: './profile-avatar.component.html',
  styleUrls: ['./profile-avatar.component.scss']
})
export class ProfileAvatarComponent implements OnInit, OnDestroy {

  show: boolean = false;
  route: Router = inject(Router);
  log = inject(AuthService);
  private clickListener: any;

  constructor(private elRef: ElementRef) {}

  ngOnInit(): void {
    // Bind and store the function reference
    this.clickListener = this.onDocumentClick.bind(this);
    // Attach the event listener using the stored reference
    document.addEventListener('click', this.clickListener);
  }

  ngOnDestroy(): void {
    // Remove the event listener using the stored reference
    document.removeEventListener('click', this.clickListener);
  }

  onClick(event: MouseEvent): void {
    // Prevent the click event from propagating to the document
    event.stopPropagation();
    this.show = !this.show;
  }

  private onDocumentClick(event: MouseEvent): void {
    if (!this.elRef.nativeElement.contains(event.target)) {
      // Clicked outside the component
      this.show = false;
    }
  }

  logout(): void {
    this.log.logout();
    this.route.navigate(['/login']);
    window.location.reload();
  }
}
