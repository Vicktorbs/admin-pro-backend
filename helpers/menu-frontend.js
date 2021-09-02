const getMenuFrontEnd = (role = 'USER_ROLE') => {
    const menu = [
        {
            title: 'Dashboard',
            icon: 'mdi mdi-gauge',
            submenu: [
                { title: 'Main', url: '/' },
                { title: 'ProgressBar', url: 'progress' },
                { title: 'Promises', url: 'promises' },
                { title: 'rxjs', url: 'rxjs' },
                { title: 'Graphic', url: 'grafica1' }
            ]
        },
        {
            title: 'Maintenance',
            icon: 'mdi mdi-folder-lock-open',
            submenu: [
                // { title: 'Users', url: 'users' },
                { title: 'Hospitals', url: 'hospitals' },
                { title: 'Medics', url: 'medics' }
            ]
        }
    ]

    if (role === 'ADMIN_ROLE') {
        menu[1].submenu.unshift({ title: 'Users', url: 'users' })
    }

    return menu;
}

module.exports = {
    getMenuFrontEnd
}