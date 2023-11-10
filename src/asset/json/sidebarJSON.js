export const EmployeeJSON = [
    {
        "name": "Dashboard",
        "path": "/dashboard",
        "icon": "bi bi-house-door",
    },
    {
        "name": "Profile Details",
        "path": "#",
        "icon": "bi bi-person",
        "openMenu": "ProfileToggleOpen",
        "child": [
            {
                "name": "Add Prodile",
                "path": "/profile/add-profile/create"
            },
            {
                "name": "View Profile",
                "path": "/profile/view-profile"
            }
        ]
    },
    {
        "name": "Jobs",
        "path": "#",
        "icon": "bi bi-briefcase",
        "openMenu": "JobToggleOpen",
        "child": [
            {
                "name": "Applied Job",
                "path": "/jobs/apllied-job"
            },
            {
                "name": "View Job",
                "path": "/jobs/view-job"
            }
        ]
    }

]
export const RecruiterJSON = [
    {
        "name": "Dashboard",
        "path": "/dashboard",
        "icon": "bi bi-house-door",
    },
    {
        "name": "Company Profile",
        "path": "#",
        "icon": "bi bi-building",
        "openMenu": "CompanyToggleOpen",
        "child": [
            {
                "name": "Add Company",
                "path": "/company/add-company"
            },
            {
                "name": "View Company",
                "path": "/company/view-company"
            }
        ]
    },
    {
        "name": "Jobs",
        "path": "#",
        "icon": "bi bi-briefcase",
        "openMenu": "JobToggleOpen",
        "child": [
            {
                "name": "Add Job",
                "path": "/jobs/add-job"
            },
            {
                "name": "View Job",
                "path": "/jobs/view-job"
            }
        ]
    },
    {
        "name": "Applied Canditates",
        "path": "/apllied/view-aplliedcabdidate",
        "icon": "bi bi-house-door",
    }

]
export const AdminJSON = [
    {
        "name": "Dashboard",
        "path": "/dashboard",
        "icon": "bi bi-house-door",
    },
    // {
    //     "name": "Profile Details",
    //     "path": "/profiledetails",
    //     "icon": "mdi mdi-developer-board menu-icon",
    //     "openMenu": "ProfileToggleOpen",
    //     "child": [
    //         {
    //             "name": "Add Prodile",
    //             "path": "/profile/add-profile/create"
    //         },
    //         {
    //             "name": "View Profile",
    //             "path": "/profile/view-profile"
    //         }
    //     ]
    // },
    {
        "name": "Company Profile",
        "path": "#",
        "icon": "bi bi-building",
        "openMenu": "CompanyToggleOpen",
        "child": [
            {
                "name": "Add Company",
                "path": "/company/add-company",
                "icon": "fiber_manual_record"
            },
            {
                "name": "View Company",
                "path": "/company/view-company",
                "icon": "fiber_manual_record"
            }
        ]
    },
    {
        "name": "Jobs",
        "path": "#",
        "icon": "bi bi-briefcase",
        "openMenu": "JobToggleOpen",
        "child": [
            {
                "name": "Add Job",
                "path": "/jobs/add-job",
                "icon": "fiber_manual_record"
            },
            {
                "name": "View Job",
                "path": "/jobs/view-job",
                "icon": "fiber_manual_record"
            }
        ]
    },
    {
        "name": "Applied Canditates",
        "path": "/apllied/view-aplliedcabdidate",
        "icon": "bi bi-person",
    },
    {
        "name": "Recruiters",
        "path": "/list-recruiters",
        "icon": "bi bi-people",
    }

]