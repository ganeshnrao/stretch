<template lang="pug">
.container-fluid.py-3
  .row.pb-3
    .col-4
      b-form-select(v-model="perPage" :options="pageOptions" size="sm")
    .col-4
      b-pagination(
        v-if="perPage !== 0 && perPage < totalRows"
        align="fill"
        v-model="currentPage"
        :total-rows="totalRows"
        :per-page="perPage"
      )
    .col-4
      b-form-input(v-model="filter" type="search" placeholder="Filter" size="sm")
  b-table(
    striped
    hover
    bordered
    head-variant="light"
    filter-debounce="100"
    show-empty
    :filter-function="customFilter"
    :fields="fields"
    :items="items"
    :filter="filter"
    :currentPage="currentPage"
    :perPage="perPage"
    @filtered="onFiltered"
  )
    template(v-slot:cell(name)="{ item }")
      b-form-input(v-model="item.name" placeholder="Name" size="sm")
    template(v-slot:cell(birthDate)="{ item }")
      b-form-input(v-model="item.birthDate" type="date" placeholder="birthDate" size="sm")
    template(v-slot:cell(gender)="{ item }")
      b-form-select(v-model="item.gender" placeholder="Gender" :options="genderOptions" size="sm")
</template>

<script>
function generateUsers(count) {
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push({
      id: i + 1,
      name: `Person ${i + 1}`,
      birthDate: new Date(
        new Date("1900-01-01").valueOf() +
          Math.random() * 100 * 365 * 24 * 60 * 60 * 1000
      )
        .toISOString()
        .slice(0, 10),
      gender: Math.random() < 0.5 ? "Male" : "Female"
    });
  }
  return result;
}

export default {
  data() {
    return {
      currentPage: 1,
      perPage: 5,
      totalRows: 0,
      genderOptions: ["Male", "Female"],
      pageOptions: [
        { value: 5, text: "5 items per page" },
        { value: 10, text: "10 items per page" },
        { value: 20, text: "20 items per page" },
        { value: 50, text: "50 items per page" },
        { value: 0, text: "All" }
      ],
      filter: "",
      fields: [
        { key: "name", sortable: true },
        { key: "birthDate", sortable: true },
        { key: "gender", sortable: true }
      ],
      items: generateUsers(10)
    };
  },

  mounted() {
    this.totalRows = this.items.length;
  },

  methods: {
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },

    customFilter(item, filter) {
      return (
        !filter.trim() ||
        `${item.name} ${item.birthDate} ${item.gender}`.includes(filter.trim())
      );
    }
  }
};
</script>
