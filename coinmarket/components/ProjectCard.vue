<template>
    <div class="card" @click="openProjectUrl(project.data.website)">
      <div class="card-top">
        <div class="card-thumbnail">
            <img :src="`https://api.thegraph.com/ipfs/api/v0/cat?arg=${project.data.image}`" alt="Card Thumbnail" />
        </div>
        <h2 class="card-title">{{ project.data.name }}</h2>
      </div>
      <div class="card-bottom">
        <div class="card-content">
            <p class="card-description">
                {{ project.data.description ? limitStringLength(project.data.description, 250) : '' }}
            </p>
        </div>
      </div>

      <div class="card-categories">
        <span v-for="category in project.data.categories">{{ category.name }}</span>
      </div>
    </div>
  </template>

<script>
export default {
    props: ['project'],
    methods: {
        openProjectUrl(url) {
            console.log(url, 'check url')
            window.open(url, '_blank')
        },
        limitStringLength(string, maxLength) {
            if (string.length > maxLength) {
                return string.substring(0, maxLength) + '...';
            }
            return string;
        }
    }
}
</script>
  
  <style lang="scss" scoped>
  .card {
    display: flex;
    flex-direction: column;
    border: $border;
    border-radius: $border-radius;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: #{scaleValue(10)};
    cursor: pointer;
    height: #{scaleValue(200)};
    position: relative;

    @media only screen and (max-width: 414px) {
      height: auto;
      padding: #{scaleValue(50)};
      margin-bottom: #{scaleValue(60)};
    }

    &-top {
        display: flex;
        align-items: center;
        margin-bottom: #{scaleValue(7)}; 

        @media only screen and (max-width: 414px) {
          margin-bottom: #{scaleValue(27)}; 
        }
    }
  }

  .card-thumbnail {
    border-radius: 100%;;
    height: #{scaleValue(30)};
    width: #{scaleValue(30)};
    overflow: hidden;
    cursor: pointer;
    flex-shrink: 0;

    @media only screen and (max-width: 414px) {
      height: #{scaleValue(100)};
      width: #{scaleValue(100)};
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  
  .card-content {
    color: $light-white;
  }

  .card-categories {
    position: absolute;
    width: 100%;
    bottom: 0;

    @media only screen and (max-width: 414px) {
      margin-top: #{scaleValue(100)};
      position: relative;
    }

    & span {
        padding: #{scaleValue(5)};
        color: $white;
        display: inline-block;
        background-color: #007bff;
        border-radius: 3rem;
        font-size: #{scaleValue(10)};
        margin-right: #{scaleValue(10)};
        margin-bottom: #{scaleValue(15)};

        @media only screen and (max-width: 414px) {
          font-size: #{scaleValue(50)};
          padding: #{scaleValue(20)} #{scaleValue(40)};
          margin-bottom: #{scaleValue(30)};
          margin-right: #{scaleValue(20)};
        }
    }
  }
  
  .card-title {
    font-size:  #{scaleValue(15)};
    font-weight: 300;
    color: $green;
    margin-left: #{scaleValue(17)};

    @media only screen and (max-width: 414px) {
      font-size:  #{scaleValue(70)};
      margin-left: #{scaleValue(30)};
    }
  }
  
  .card-description {
    font-size: #{scaleValue(14)};
    color: white; 
    line-height: #{scaleValue(25)};
    font-weight: 300;

    @media only screen and (max-width: 414px) {
      font-size:  #{scaleValue(60)};
      line-height: #{scaleValue(90)};
    }
  }
  
  .card-actions {
    display: flex;
    justify-content: space-between;
  
    .action-button {
      padding: 8px 16px;
      background-color: #0070f3;
      color: #fff;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s;
  
      &:hover {
        background-color: #0054b3;
      }
  
      &:focus {
        outline: none;
        box-shadow: 0 0 0 2px rgba(0, 112, 243, 0.4);
      }
    }
  }
  </style>
  