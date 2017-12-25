    module.exports.parseEcho = function(type,code) {
     var ECHOMessageType = ['REPLY', 'NA', 'NA', 'DESTIATION_UNREACHABLE','SOURCE_QUENCH','REDIRECT']; 
     var DestinationUnreachableCode = ['NET','HOST','PROTOCOL','PORT','FRAGMENTATION','ROUTE_FAILED',
     'NET_UNKNOWN','HOST_UNKNOWN','HOST_ISOLATED','NET_PROHIBITED','HOST_PROHIBITED','NET_UNREACHABLE',
     'HOST_UNREACHABLE','COMM_PROHIBITED','HOST_PRECEDENCE','PRECEDENCE_CUTOFF'];
     var RedirectCode = ['NETWOK','HOST','SERVICE_NETWORK','HOST_NETWORK'];

    var t = 'OTHER';
     var c = 'NO_CODE';
     if(type < ECHOMessageType.length) {
     t = ECHOMessageType[type];
     }
     switch (type) {
     case 3: c = DestinationUnreachableCode[code]; break; //DESTINATION_UNREACHABLE
     case 5: c = RedirectCode[code]; break; //REDIRECT
     }
     return Object.freeze({ 
     result: (type == 0), 
     type: t, 
     code: c
     });

    }