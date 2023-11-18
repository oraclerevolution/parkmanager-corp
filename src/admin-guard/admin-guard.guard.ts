import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ADMIN_AUTH_GUARD } from "./admin-guard.strategy";

@Injectable()
export class AdminAuthGuard extends AuthGuard(ADMIN_AUTH_GUARD) {}