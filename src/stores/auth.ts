import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "@/plugins/axios";
import jwtUtil from "@/utils/jwt";
import type { registerPayload, loginPayload } from "@/types/auth.types";

export const useAuthStore = defineStore("auth", () => {
  const showSingUPModal = ref(false);
  const showLoginModal = ref(false);
  const isLoggedIn = ref();
  const isVerified = ref(false);
  const loading = ref(false);
  const showOtp = ref(false);
  const errorMassage = ref("");
  const user = ref<any>();
  const notifeeMsg = ref("");

  // const wishItems = ref<any[]>([]);

  const isValid = ref({
    isEmail: false,
    isPassword: false,
    isName: false,
  });

  async function verifyToken() {
    loading.value = true;
    try {
      await axios
        .get("/users/auth")
        .then((response) => {
          if (response.status == 200) {
            isLoggedIn.value = true;
            user.value = response.data.user;
            loading.value = false;
          }
        })
        .catch((error) => {
          isLoggedIn.value = false;
          if (isLoggedIn.value == false) {
            window.localStorage.removeItem("tokenId");
          }
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
          if (response.status === 200) {
            errorMassage.value = "Enter the code";
            showOtp.value = true;
            loading.value = false;
          }
        })
        .catch((error) => {
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
          if (res.status == 201) {
            user.value = res.data.user;
            jwtUtil.saveToken(res.data.token);
            isLoggedIn.value = true;
          }
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
            user.value = res.data.user;
            jwtUtil.saveToken(res.data.token);
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
          }
        })
        .catch((error) => {
          errorMassage.value = error.response.data.msg;
        });
    } catch (error) {
      console.log(error);
    }
  }
  async function changePass(currentPass: string, newPass: string) {
    try {
      await axios
        .post("/users/changePass", {
          id: user.value._id,
          currentPass: currentPass,
          newPass: newPass,
        })
        .then((res) => {
          errorMassage.value = res.data.message;
        })
        .catch((error) => {
          errorMassage.value = error.response.data.message;
        });
    } catch (error) {
      console.log(error);
    }
  }
  async function addToWishlist(product: any, like: boolean) {
    if (isLoggedIn.value === true) {
      if (like == false) {
        let obj = {
          _id: product._id,
          name: product.name,
          price: product.price,
          img: product.img,
        };

        user.value.wishList.push(obj);
        notifeeMsg.value = "Item added to Wishlist";
      } else {
        user.value.wishList = user.value.wishList.filter(
          (el: any) => el._id !== product._id
        );
        notifeeMsg.value = "Item removed from Wishlist";
      }
      console.log(notifeeMsg.value);
      await axios
        .post("/users/addToWish", {
          id: user.value._id,
          wishlist: user.value.wishList,
        })
        .then((res) => {})
        .catch((error) => {});
    } else {
      showLoginModal.value = true;
    }
  }
  return {
    errorMassage,
    isValid,
    loading,
    showOtp,
    isVerified,
    isLoggedIn,
    user,
    showSingUPModal,
    showLoginModal,
    notifeeMsg,
    verifyToken,
    register,
    verify,
    sendOtp,
    sendLoginCode,
    login,
    resetPass,
    addToWishlist,
    changePass,
  };
});
