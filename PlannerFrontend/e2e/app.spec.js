describe('Login', () => {
    beforeEach(async () => {
      await device.reloadReactNative();
    });
  
    it('should have login screen', async () => {
      await expect(element(by.id('loginScreen'))).toBeVisible();
    });
  
    it('should login successfully', async () => {
      await element(by.id('usernameInput')).typeText('demo');
      await element(by.id('passwordInput')).typeText('pass');
      await element(by.id('loginButton')).tap();
      await expect(element(by.id('homeScreen'))).toBeVisible();
    });
  });
  