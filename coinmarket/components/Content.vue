<template>
    <div class="list">
        <SideNav 
            :sidenav_open="sidenav_open"
            :toggle_sidenav="toggle_sidenav"
            />
        <Header :toggle_sidenav="toggle_sidenav"/>
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            sidenav_open: true
        }
    },
    methods: {
        toggle_sidenav() {
            this.sidenav_open ? this.sidenav_open = false : this.sidenav_open = true;
        }
    },
    mounted() {
        const mediaQuery = window.matchMedia("(max-width: 414px)");

        if (mediaQuery.matches) {
            this.sidenav_open = false;
        }
    },
}
</script>