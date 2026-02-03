import type { AxiosInstance } from "axios";
import type { IAPIResponse } from "@/utils/interfaces.util";
import type { LoginDTO, LogoutDTO, RegisterUserDTO } from "@/dtos/auth.dto";

export class AuthApi {
  constructor(
    private publicClient: AxiosInstance,
    private privateClient: AxiosInstance
  ) {}

  login(payload: LoginDTO): Promise<IAPIResponse> {
    return this.publicClient.post("/auth/login", payload);
  }

  register(payload: RegisterUserDTO): Promise<IAPIResponse> {
    return this.publicClient.post("/auth/register", payload);
  }

  logout(payload: LogoutDTO): Promise<IAPIResponse> {
    return this.privateClient.post("/auth/logout", payload);
  }
}
