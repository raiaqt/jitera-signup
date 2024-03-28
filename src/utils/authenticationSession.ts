import { STORAGE_KEYS } from '@constants/storage';

class AuthenticationSessionStorage {
  private storage: Record<string, any>;
  private processInstance?: Promise<unknown>;
  private processResolve?: (value: unknown) => void;
  constructor() {
    this.storage = {};
  }

  initialProcessing() {
    return this.processInstance;
  }

  initial() {
    if (this.processInstance) {
      return this.processInstance;
    }
    this.processInstance = new Promise((resolve) => {
      this.processResolve = resolve;
    });
    return this.processInstance;
  }

  private endProcessed() {
    if (this.processResolve) {
      this.processResolve(true);
      this.processResolve = undefined;
      this.processInstance = undefined;
    }
  }

  getAuthentication() {
    return (
      this.storage[STORAGE_KEYS.AUTHENTICATION] ||
      JSON.parse(localStorage.getItem(STORAGE_KEYS.AUTHENTICATION) || '{}')
    );
  }

  getAuthenticatedStatus() {
    const authenticationInfor = this.getAuthentication();

    if (!authenticationInfor) return false;

    if (authenticationInfor && Object.keys(authenticationInfor).length === 0) return false;

    return true;
  }

  setAuthentication(data?: any) {
    if (data?.accessToken) {
      this.storage[STORAGE_KEYS.AUTHENTICATION] = data;
    }
    this.endProcessed();
  }

  setInitialAuthentication(data?: any) {
    if (data?.accessToken) {
      this.storage[STORAGE_KEYS.AUTHENTICATION] = data;
    }
  }

  clearAuthentication() {
    delete this.storage[STORAGE_KEYS.AUTHENTICATION];
  }
}

export default new AuthenticationSessionStorage();
