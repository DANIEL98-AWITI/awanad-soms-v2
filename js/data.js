// ===============================
// AWANAD SOMS CENTRAL DATABASE
// ===============================

const DB = {

    get(key){

        return JSON.parse(localStorage.getItem(key)) || [];

    },

    save(key,data){

        localStorage.setItem(key,JSON.stringify(data));

    }

};
