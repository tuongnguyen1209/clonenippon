import { getAllProduct } from "./server.js";

const app = new Vue({
  el: "#app",
  data: {
    txtText: "",
    isSearching: false,
    listProduct: [
      {
        name: "",
        link: "",
        category: "",
        images: "",
        info: "",
        tinhchat: "",
      },
    ],
    listCheck: [],
    index: 0,
    current: -1,
    show: false,
    error: "",
    serve: 0,
  },
  methods: {
    search: function (e) {
      e.preventDefault();
      console.log("voday");
      this.isSearching = true;
      this.show = true;
      getAllProduct(this.txtText)
        .then((result) => {
          console.log(result);
          this.listProduct = result.data;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.isSearching = false;
        });
    },
    changeValue: function (e) {
      const { value } = e.target;
      this.txtText = value;
      console.log(this.txtText);
    },
  },
});
