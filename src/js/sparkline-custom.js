$(function () {
      $("#sparkline1").sparkline([52, 12, 44], {
        type: 'pie',
        height: '180px',
        sliceColors: ['#0398AB', '#ADDEE4', '#0398aba6']});
     $("#sparkline2").sparkline([5, 6, 7, 2, 0, 4, 2, 4, 5, 7, 2, 4, 12, 14, 4, 2, 14, 12, 7], {
        type: 'bar',
        barWidth:10,
        height: '180px',
        barColor: '#0398AB',
        negBarColor: '#c6c6c6'});
      $("#sparkline3").sparkline([34, 43, 43, 35, 44, 32, 15, 22, 46, 33, 86, 54, 73, 53, 12, 53, 23, 65, 23, 63, 53, 42, 34, 56, 76, 15, 54, 23, 44], {
        type: 'line',
        lineWidth: 1,
        height: '180px',
        lineColor: '#0398AB',
        fillColor: 'rgba(68, 70, 79, 0.5)'
    });
});

