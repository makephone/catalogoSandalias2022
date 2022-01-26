export default {
    formatCurrency: function (num) {
        return 'R$' + num  ;
    },
    formatDescunt: function (des) {
        return   des+'%' ;
    },
    formatTotal: function (to) {
        return   'R$'+to.toFixed(2) ;
    }

}