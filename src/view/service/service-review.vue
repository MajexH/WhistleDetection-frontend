<template>
  <div>
    <service-table
      :source="review">
    </service-table>
  </div>
</template>

<script>
import serviceTable from '@/components/service-table/service-table'

export default {
  components: {
    serviceTable
  }
}
</script>

<style>

</style>
