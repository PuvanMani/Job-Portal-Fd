import Swal from "sweetalert2";

export function DeleteAlert() {
    return (
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Deleted!",
                    text: `Data has been deleted.`,
                    icon: "success"
                });
                return true;
            }
        })
    )
}
export function UpdateAlert() {
    return (
        Swal.fire({
            title: 'Do you want to Update the User?',
            showDenyButton: true,
            confirmButtonText: 'Update',
            denyButtonText: `Don't Update`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                Swal.fire('Saved!', '', 'success')
                return true
            } else if (result.isDenied) {
                Swal.fire('Changes are not Deleted', '', 'info')
                return false
            }
        })
    )
}
export function SuccessAlert() {
    return (
        Swal.fire({
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1000
        })
    )
}

export const ErrorAlert = (title, text) => {
    Swal.fire({
        icon: "error",
        title: title,
        text: text,
        footer: `<a href="/auth/signup">If you don't have an account. Register?</a>`
    });
}