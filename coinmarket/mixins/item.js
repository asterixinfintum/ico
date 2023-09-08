export default {
  methods: {
      generateData() {
          var types = ["Buy", "Sell"];
          var currentDate = new Date();
        
          var timestamp = currentDate.toLocaleString();
          var type = types[Math.floor(Math.random() * types.length)];
          var price = (Math.random() * 100).toFixed(2);
          var quantity = Math.floor(Math.random() * 1000000) + 1;
          var ratio = (Math.random() * 0.1).toFixed(5);
          var cost = (Math.random() * 0.1).toFixed(10);
          var identifier = this.generateIdentifier();
          var transactionID = this.generateTransactionID();
        
          var obj = {
            timestamp: timestamp,
            type: type,
            price: price,
            quantity: quantity,
            ratio: ratio,
            cost: cost,
            identifier: identifier,
            transactionID: transactionID
          };

          return obj;
        },
        generateIdentifier() {
          var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
          var length = 6;
          var result = "";
        
          for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
          }
        
          return result;
        },
        generateTransactionID() {
          var characters = "abcdef0123456789";
          var length = 6;
          var result = "";
        
          for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
          }
        
          return result;
        }
  },
  computed: {
    buy_sell_data() {
      return this.generateData();
    }
  }
}