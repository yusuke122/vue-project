<script setup>
</script>
<template>
    <div class="loading-modal modal">
        <div class="spinner-border" role="status">
        </div>
    </div>
</template>
<style scoped>
.loading-modal{
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  display: flex;
  justify-content: center;
  text-align:center;
  padding-top: 10%;
  background-color: rgba(155,129,129,0.2);
}
.spinner-border{
    color:#aaaaaa;
    width:25rem;
    height:25rem;
}
</style>