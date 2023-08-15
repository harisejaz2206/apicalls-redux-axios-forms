// Importing interfaces
// import { IToken } from "../../app/features/auth/interfaces/token.interface";
import { ISignUpInterface } from "../../app/features/auth/interfaces/sign-up.interface";
import { ILogInInterface } from "../../app/features/auth/interfaces/login.interface";
import { IForgotPasswordInterface } from "../../app/features/auth/interfaces/forgot-password.interface";
import { IResetPasswordInterface } from "../../app/features/auth/interfaces/reset-password.interface";
import { IProfileSetupInterface } from "../../app/features/auth/interfaces/profile-setup.interface";
import { IUser } from "../../app/features/auth/interfaces/user.interface";
import { IResponseInterface } from "../interfaces/api-response.interface";

// Importing base class
import { HttpService } from "./base.service";

class UserService extends HttpService {
  private readonly prefix: string = "api/v1/auth";

  signUpUser = (
    data: ISignUpInterface
  ): Promise<IResponseInterface<{ token: string; user: IUser }>> =>
    this.post(`${this.prefix}/signup`, data);

  loginUser = (
    data: ILogInInterface
  ): Promise<IResponseInterface<{ token: string; user: IUser }>> =>
    this.post(`${this.prefix}/login`, data);

  //   forgotPassword = (
  //     data: IForgotPasswordInterface
  //   ): Promise<IResponseInterface<{}>> =>
  //     this.post(`${this.prefix}/forget-password`, data);

  //   resetPassword = (
  //     data: IResetPasswordInterface
  //   ): Promise<IResponseInterface<{}>> =>
  //     this.post(`${this.prefix}/reset-password`, data);

  //   profileSetup = (
  //     data: IProfileSetupInterface
  //   ): Promise<IResponseInterface<{}>> => this.put(`user/setup-profile`, data);

  //   getUserProfile = (id: string): Promise<IResponseInterface<{}>> =>
  //     this.get(`user/${id}`);

  //   changePassword = (data: any): Promise<IResponseInterface<{}>> =>
  //     this.put(`user/update-password`, data);

  //   sendEmailOTP = (data: any): Promise<IResponseInterface<{}>> =>
  //     this.put(`user/send-email-otp`, data);

  //   verifyEmailOTP = (data: any): Promise<IResponseInterface<{}>> =>
  //     this.put(`user/update-email`, data);

  //   sendPhoneOTP = (data: any): Promise<IResponseInterface<{}>> =>
  //     this.put(`user/send-phone-otp`, data);

  //   verifyPhoneOTP = (data: any): Promise<IResponseInterface<{}>> =>
  //     this.put(`user/update-phone`, data);

  //   searchUserByEmail = (
  //     query: string,
  //     id: string
  //   ): Promise<IResponseInterface<{}>> =>
  //     this.get(`user/search?organizationId=${id}&query=${query}`);

  //   globalUserSearch = (query: string): Promise<IResponseInterface<{}>> =>
  //     this.get(`user/global-search?query=${query}&page=1&limit=25`);

  //   globalUpdateSearch = (
  //     page: number,
  //     query: string
  //   ): Promise<IResponseInterface<{}>> =>
  //     this.get(`post/all?query=${query}&page=${page}&limit=25`);

  //   sendOrganisationSimpleInvite = (data: any): Promise<IResponseInterface<{}>> =>
  //     this.post(`organization-member/send/simple-invite`, data);

  //   sendInviteToNonSystemUser = (data: any): Promise<IResponseInterface<{}>> =>
  //     this.post(`organization-member/send/invite`, data);

  //   verifyEmail2FA = (data: any): Promise<IResponseInterface<{}>> =>
  //     this.post(`${this.prefix}/verify-2fa`, data);

  //   resendEmail2FA = (data: any): Promise<IResponseInterface<{}>> =>
  //     this.post(`${this.prefix}/resend-2fa`, data);

  //   deleteAccount = (): Promise<IResponseInterface<{}>> => this.delete(`user`);
}
export const userService = new UserService();
