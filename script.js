if (window.location.href.indexOf("/") > -1) {
  // Create the signInUp form.
  const signInUp = document.createElement("form");
  signInUp.className = "signInUp";
  const mainSection = document.querySelector("main");
  mainSection.appendChild(signInUp);

  signIn(); // Run login at start. (Default)
}

// Log in.
function signIn() {
  const signInUp = document.querySelector(".signInUp");
  signInUp.innerHTML = `
    <div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-md w-full space-y-8">
    <div>
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
    </div>
    <form class="mt-8 space-y-6">
      <input type="hidden" name="remember" value="true">
      <div class="rounded-md shadow-sm -space-y-px">
        <div>
          <label for="username" class="sr-only">Username</label>
          <input id="username" name="username" type="text" autocomplete="username" minlength="3" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Username">
        </div>
        <div>
          <label for="password" class="sr-only">Password</label>
          <input id="password" name="password" type="password" autocomplete="current-password" minlength="6" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password">
        </div>
      </div>

      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded">
          <label for="remember-me" class="ml-2 block text-sm text-gray-900"> Remember me </label>
        </div>

        <div class="text-sm">
          <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500"> Forgot your password? </a>
        </div>
      </div>

      <div>
        <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <span class="absolute left-0 inset-y-0 flex items-center pl-3">
            <!-- Heroicon name: solid/lock-closed -->
            <svg class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
            </svg>
          </span>
          Sign in
        </button>
      </div>
    </form>
    <p class="mt-2 text-center text-sm text-gray-600"> Or </p>
    <p id="signInUp-link" onclick="signUp()" class="text-center cursor-pointer font-medium text-indigo-600 hover:text-indigo-500"> Register an account instead. </p>
  </div>
</div>
    `;

  if (document.querySelector("button")) {
    const loginBtn = document.querySelector("button");
    loginBtn.addEventListener("click", async (stopRefresh) => {
      if (
        document.querySelector("#username").value.length < 3 ||
        document.querySelector("#password").value.length < 6
      ) {
        return;
      } else {
        stopRefresh.preventDefault();
        const response = await fetch("http://localhost:1337/api/auth/local", {
          method: "POST",
          mode: "cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            identifier: document.querySelector("#username").value,
            password: document.querySelector("#password").value,
          }),
        });
        const data = await response.json();

        // Successful Log in.
        if (data.jwt) {
          signInUp.remove();
          return signedIn(data);

          // Error
        } else {
          signInUp.innerHTML = `
              <h2>Something went wrong!</h2>
              <h3>${data.error.message}</h3>
              <p id="signInUp-link" onclick="signIn()">Try again.</p>
              `;
        }
      }
    });
  }
}

// Register account.
function signUp() {
  const signInUp = document.querySelector(".signInUp");
  signInUp.innerHTML = `
    <div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-md w-full space-y-8">
    <div>
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Register an account</h2>
    </div>
    <form class="mt-8 space-y-6">
      <input type="hidden" name="remember" value="true">
      <div class="rounded-md shadow-sm -space-y-px">
        <div>
          <label for="username" class="sr-only">Username</label>
          <input id="username" name="username" type="text" autocomplete="username" minlength="3" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Username">
        </div>
        <div>
          <label for="email-address" class="sr-only">Email address</label>
          <input id="email-address" name="email" type="email" autocomplete="email" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address">
        </div>
        <div>
          <label for="full-name" class="sr-only">Full name</label>
          <input id="full-name" name="full-name" type="text" autocomplete="name" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Your full name">
        </div>
        <div>
          <label for="password" class="sr-only">Password</label>
          <input id="password" name="password" type="password" autocomplete="current-password" minlength="6" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password">
          <p id="passwordStrength" class="mt-2 text-center text-sm text-gray-600"></p>
          <p id="passwordTip" class="mt-2 text-center text-sm text-gray-600"></p>
        </div>
      </div>
      <div>
        <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <span class="absolute left-0 inset-y-0 flex items-center pl-3">
            <!-- Heroicon name: solid/lock-closed -->
            <svg class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
            </svg>
          </span>
          Sign up
        </button>
      </div>
    </form>
    <p class="mt-2 text-center text-sm text-gray-600"> Or </p>
    <p id="signInUp-link" onclick="signIn()" class="text-center cursor-pointer font-medium text-indigo-600 hover:text-indigo-500"> Sign in with an existing account. </p>
  </div>
</div>
    `;

  // Password strength check.
  const passwordInput = document.querySelector("#password");
  document.addEventListener("keyup", () => {
    const passwordStrengthIndicator =
      document.querySelector("#passwordStrength");
    const passwordTip = document.querySelector("#passwordTip");

    if (passwordInput.value.match(/^(?=.*[a-z]).{6,20}$/)) {
      passwordTip.textContent = "(try adding at least one uppercase letter)";
      passwordStrengthIndicator.textContent = "Password strength is weak!";
    }
    if (passwordInput.value.match(/^(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)) {
      passwordTip.textContent = "(try adding at least one numeric digit)";
      passwordStrengthIndicator.textContent =
        "Password strength could be better!";
    }
    if (passwordInput.value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)) {
      passwordTip.textContent = " (try adding at least one special character)";
      passwordStrengthIndicator.textContent = "Password strength is OK!";
    }
    if (
      passwordInput.value.match(
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$/
      )
    ) {
      passwordTip.textContent = "(Password strength is now very strong)";
      passwordStrengthIndicator.textContent = "Perfect!";
    }
  });

  // Account registration.
  if (document.querySelector("button")) {
    const registerBtn = document.querySelector("button");
    registerBtn.addEventListener("click", async (stopRefresh) => {
      if (
        document.querySelector("#username").value.length < 3 ||
        document.querySelector("#email-address").value.length < 6 ||
        document.querySelector("#full-name").value.length < 1 ||
        document.querySelector("#password").value.length < 6
      ) {
        return;
      } else {
        stopRefresh.preventDefault();
        const response = await fetch(
          "http://localhost:1337/api/auth/local/register",
          {
            method: "POST",
            mode: "cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username: document.querySelector("#username").value,
              email: document.querySelector("#email-address").value,
              name: document.querySelector("#full-name").value,
              password: document.querySelector("#password").value,
            }),
          }
        );
        const data = await response.json();

        // Successful registration. (Automatically log in when done)
        if (data.jwt) {
          signInUp.remove();
          return signedIn(data);

          // Error
        } else {
          signInUp.innerHTML = `
              <h2>Something went wrong!</h2>
              <h3>${data.error.message}</h3>
              <p id="signInUp-link" onclick="signUp()">Try again.</p>
              `;
        }
      }
    });
  }
}

// User is logged in.
async function signedIn(data) {
  const userContent = document.createElement("div");
  userContent.className = "userContent";
  const mainSection = document.querySelector("main");
  mainSection.appendChild(userContent);

  userContent.innerHTML = `
    <p>Welcome ${data.user.username}!</p>
    <p>You are now logged in.</p>
    `;
}
