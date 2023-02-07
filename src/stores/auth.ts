import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "@/plugins/axios";
import jwtUtil from "@/utils/jwt";
import type { registerPayload, loginPayload } from "@/types/auth.types";

export const useAuthStore = defineStore("auth", () => {
  const isLoggedIn = ref(false);
  const isVerified = ref(false);
  const loading = ref(false);
  const showOtp = ref(false);
  const errorMassage = ref("");
  const isValid = ref({
    isEmail: false,
    isPassword: false,
    isName: false,
  });

  async function verifyToken() {
    try {
      await axios
        .get("/users/auth")
        .then((response) => {
          if (response.status == 200) {
            isLoggedIn.value = true;
          } else {
            isLoggedIn.value = false;
          }
        })
        .catch((error) => {
          // console.log(error.status)
        });
    } catch (err) {
      console.log(err);
    }
  }
  async function sendOtp(email: String) {
    loading.value = true;
    errorMassage.value = "";
    try {
      await axios
        .post("/users/sendOtp", { email })
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            errorMassage.value = "Enter the code";
            showOtp.value = true;
            loading.value = false;
          }
        })
        .catch((error) => {
          console.log(error.response.data);
          errorMassage.value = error.response.data.message;
          loading.value = false;
        });
    } catch (error) {
      console.log(error);
    }
  }
  async function verify(email: String, code: Number) {
    loading.value = true;
    try {
      await axios
        .post("/users/verify", { email, code })
        .then((response) => {
          // console.log(response.data);
          if (response.data == "Verified") {
            errorMassage.value = response.data;
            showOtp.value = false;
            loading.value = true;
            setTimeout(() => {
              isVerified.value = true;
            }, 2000);
          }
        })
        .catch((error) => {
          // console.log(error.response.data);
          errorMassage.value = error.response.data;
          loading.value = false;
        });
    } catch (error) {
      console.log(error);
    }
  }
  async function register(data: registerPayload) {
    const { email, name, lastName, phone, password, address } = data;
    try {
      await axios
        .post("/users/register", {
          email,
          name,
          lastName,
          phone,
          password,
          address,
        })
        .then((res) => {
          jwtUtil.saveToken(res.data.user.token);
          isLoggedIn.value = true;
          jwtUtil.saveUser(JSON.stringify(res.data.user));
        })
        .catch((error) => {
          loading.value = false;
          errorMassage.value = error.response;
        });
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  async function sendLoginCode(email: String) {
    loading.value = true;
    errorMassage.value = "";
    try {
      await axios
        .post("/users/loginOtp", { email })
        .then((response) => {
          if (response.status === 200) {
            errorMassage.value = "Enter the code";
            showOtp.value = true;
            loading.value = false;
          }
        })
        .catch((error) => {
          console.log(error.response.data);
          errorMassage.value = error.response.data.message;
          loading.value = false;
        });
    } catch (error) {
      console.log(error);
    }
  }
  async function login(formData: loginPayload) {
    try {
      await axios
        .post("/users/login", formData)
        .then((res) => {
          if (res.status == 200) {
            jwtUtil.saveToken(res.data.token);
            jwtUtil.saveUser(JSON.stringify(res.data.user));
            isLoggedIn.value = true;
          }
        })
        .catch((error) => {
          errorMassage.value = error.response.data.msg;
        });
    } catch (error) {
      console.log(error);
    }
  }
  async function resetPass(formData: any) {
    try {
      await axios
        .post("/users/resetPass", formData)
        .then((res) => {
          if (res.status == 200) {
            errorMassage.value = res.data.message;
            isLoggedIn.value = true;
            // console.log(res.data.message)
          }
        })
        .catch((error) => {
          errorMassage.value = error.response.data.msg;
        });
    } catch (error) {
      console.log(error);
    }
  }
  return {
    errorMassage,
    isValid,
    loading,
    showOtp,
    isVerified,
    isLoggedIn,
    verifyToken,
    register,
    verify,
    sendOtp,
    sendLoginCode,
    login,
    resetPass,
  };
});
