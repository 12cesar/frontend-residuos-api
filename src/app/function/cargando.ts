import Swal from "sweetalert2";

export const cargandoLoad=(title: string)=>{
    Swal.fire({
        title,
        html: '<p>porfavor espere</p>',
        timer:1000,
        input: 'radio',
        didOpen: () => {
          Swal.showLoading();
        },
      })
}
export const closeAlert = () => {
    Swal.close();
  };