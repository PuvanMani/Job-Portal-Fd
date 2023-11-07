import Swal from "sweetalert2";
export function DeleteAlert() {
    return (
        Swal.fire({
            title: 'Do you want to Delete the User?',
            showDenyButton: true,
            confirmButtonText: 'Delete',
            denyButtonText: `Don't Delete`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                Swal.fire('Deleted!', '', 'success')
                return true
            } else if (result.isDenied) {
                Swal.fire('Changes are not Deleted', '', 'info')
                return false
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

