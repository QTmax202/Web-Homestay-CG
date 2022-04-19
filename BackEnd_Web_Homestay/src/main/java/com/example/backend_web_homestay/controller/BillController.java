package com.example.backend_web_homestay.controller;


import com.example.backend_web_homestay.DTO.MyBillDTO;
import com.example.backend_web_homestay.DTO.TurnOverDTO;
import com.example.backend_web_homestay.DTO.YourBillDTO;
import com.example.backend_web_homestay.model.Account;
import com.example.backend_web_homestay.model.Bill;
import com.example.backend_web_homestay.model.Homestay;
import com.example.backend_web_homestay.model.Notify;
import com.example.backend_web_homestay.repository.IBillRepository;
import com.example.backend_web_homestay.repository.INotifyRepository;
import com.example.backend_web_homestay.service.Account.IAccountService;
import com.example.backend_web_homestay.service.Bill.IBillService;
import com.example.backend_web_homestay.service.HomeStay.IHomestayService;
import com.example.backend_web_homestay.service.Notify.INotifyService;
import com.example.backend_web_homestay.service.StatusHomestay.IStatusHomestayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Iterator;
import java.util.Optional;

@RestController
@RequestMapping("/api/bill")
@CrossOrigin("*")
public class BillController {

    @Autowired
    private IBillRepository billRepository;

    @Autowired
    private IStatusHomestayService statusHomestayService;

    @Autowired
    private IBillService billService;

    @Autowired
    private INotifyRepository notifyRepository;

    @Autowired
    private INotifyService notifyService;

    @Autowired
    private IHomestayService homestayService;

    @Autowired
    private IAccountService accountService;

    @GetMapping("/account/{id}")
    private ResponseEntity<?> getYourBillByAccountId(@PathVariable long id) {
        Iterable<YourBillDTO> yourBillDTOS = billService.getYourBillByAccountId(id);
        return new ResponseEntity<>(yourBillDTOS, HttpStatus.OK);
    }

    @GetMapping("/account-my-bill/{id}")
    private ResponseEntity<?> getMyBillByAccountId(@PathVariable long id) {
        Iterable<MyBillDTO> myBillDTOS = billService.getMyBillByAccountId(id);
        return new ResponseEntity<>(myBillDTOS, HttpStatus.OK);
    }

    @GetMapping("/bill-by-account-id/{id}")
    private ResponseEntity<?> getBillByAccountId(@PathVariable long id) {
        Iterable<Bill> bills = billRepository.getBillByAccount_Id(id);
        return new ResponseEntity<>(bills, HttpStatus.OK);
    }

    @GetMapping("/bill-by-homestay-account-id/{id}")
    private ResponseEntity<?> getBillByHomestayAccountId(@PathVariable long id) {
        Iterable<Bill> bills = billRepository.findBillByHomestay_Account_Id(id);
        return new ResponseEntity<>(bills, HttpStatus.OK);
    }

    @PostMapping("/create-bill")
    private ResponseEntity<?> createBill(@RequestBody Bill bill){
        bill.setRegistration_date(LocalDate.now());
        bill.setStatus_homestay(statusHomestayService.findById(1L).get());
        billService.save(bill);
        Optional<Homestay> homestay =homestayService.findById(bill.getHomestay().getId());
        Optional<Account> account = accountService.findById(bill.getAccount().getId());
        Notify notify_client = new Notify();
        notify_client.setBill(bill);
        notify_client.setDate_notify(LocalDate.now());
        notify_client.setAccount(account.get());
        notify_client.setHomestay(homestay.get());
        notify_client.setContent("Bạn đã đăng ký thuê Homestay "+homestay.get().getName());
        notifyService.save(notify_client);
        Notify notify_host = new Notify();
        notify_host.setBill(bill);
        notify_host.setDate_notify(LocalDate.now());
        notify_host.setAccount(homestay.get().getAccount());
        notify_host.setHomestay(homestay.get());
        notify_host.setContent("" + account.get().getName() + " đã đăng ký thuê Homestay "+ homestay.get().getName());
        notifyService.save(notify_host);
        return new ResponseEntity<>(bill, HttpStatus.OK);
    }

    @GetMapping("/bill-homestay/{id}")
    private ResponseEntity<?> getBillHomestay(@PathVariable long id){
        Iterable<Bill> billHomestay = billService.findBillByHomeStayId(id);
        return new ResponseEntity<>(billHomestay, HttpStatus.OK);
    }

    @GetMapping("/bill-homestay-status/{id}")
    private ResponseEntity<?> getBillHomestayStatus(@PathVariable long id){
        Iterable<Bill> bills = billRepository.findAllBillByHomestay_Status(id);
        return new ResponseEntity<>(bills, HttpStatus.OK);
    }

    @GetMapping("/turn-over")
    public ResponseEntity<?> findTurnOverByAccountAndStartDate(@RequestParam(required = false) long id,
                                                               @RequestParam(required = false) String startDate1,
                                                               @RequestParam(required = false) String startDate2) {
        Iterable<TurnOverDTO> turnOverDTOS = billService.findTurnOverByAccountAndStartDate(id, startDate1, startDate2);
        if (!turnOverDTOS.iterator().hasNext()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(turnOverDTOS, HttpStatus.OK);
    }

    @PostMapping("/registration-confirmation")
    private ResponseEntity<?> registrationConfirmation(@RequestBody long id){
        Optional<Bill> bill = billService.findById(id);
        if (bill.isPresent()){
            bill.get().setId(id);
            bill.get().setStatus_homestay(statusHomestayService.findById(2L).get());
            billService.save(bill.get());
            Notify notify_client = new Notify();
            notify_client.setBill(bill.get());
            notify_client.setDate_notify(LocalDate.now());
            notify_client.setAccount(bill.get().getAccount());
            notify_client.setHomestay(bill.get().getHomestay());
            notify_client.setContent("Chủ Homestay "+bill.get().getHomestay().getName()+" đã xác nhận đăng ký thuê Homestay ");
            notifyService.save(notify_client);
            Notify notify_host = new Notify();
            notify_host.setBill(bill.get());
            notify_host.setDate_notify(LocalDate.now());
            notify_host.setAccount(bill.get().getHomestay().getAccount());
            notify_host.setHomestay(bill.get().getHomestay());
            notify_host.setContent("Bạn đã xác nhận " + bill.get().getAccount().getName() + " thuê Homestay "+ bill.get().getHomestay().getName());
            notifyService.save(notify_host);
            return new ResponseEntity<>(bill, HttpStatus.OK);
        }
        return new ResponseEntity<>(bill, HttpStatus.ACCEPTED);
    }

    @PostMapping("/cancelling-invoice-client")
    private ResponseEntity<?> cancellingInvoiceClient(@RequestBody long id){
        Optional<Bill> bill = billService.findById(id);
        if (bill.isPresent()){
            bill.get().setId(id);
            bill.get().setStatus_homestay(statusHomestayService.findById(5L).get());
            billService.save(bill.get());
            Notify notify_client = new Notify();
            notify_client.setBill(bill.get());
            notify_client.setDate_notify(LocalDate.now());
            notify_client.setAccount(bill.get().getAccount());
            notify_client.setHomestay(bill.get().getHomestay());
            notify_client.setContent("Bạn đã hủy đăng ký thuê Homestay "+bill.get().getHomestay().getName());
            notifyService.save(notify_client);
            Notify notify_host = new Notify();
            notify_host.setBill(bill.get());
            notify_host.setDate_notify(LocalDate.now());
            notify_host.setAccount(bill.get().getHomestay().getAccount());
            notify_host.setHomestay(bill.get().getHomestay());
            notify_host.setContent("" + bill.get().getAccount().getName() + " đã hủy đăng ký thuê Homestay "+ bill.get().getHomestay().getName());
            notifyService.save(notify_host);
            return new ResponseEntity<>(bill, HttpStatus.OK);
        }
        return new ResponseEntity<>(bill, HttpStatus.ACCEPTED);
    }

    @PostMapping("/cancelling-invoice-host")
    private ResponseEntity<?> cancellingInvoiceHost(@RequestBody long id){
        Optional<Bill> bill = billService.findById(id);
        if (bill.isPresent()){
            bill.get().setId(id);
            bill.get().setStatus_homestay(statusHomestayService.findById(5L).get());
            billService.save(bill.get());
            Notify notify_client = new Notify();
            notify_client.setBill(bill.get());
            notify_client.setDate_notify(LocalDate.now());
            notify_client.setAccount(bill.get().getAccount());
            notify_client.setHomestay(bill.get().getHomestay());
            notify_client.setContent("Chủ Homestay "+bill.get().getHomestay().getName()+" đã hủy đăng ký thuê Homestay ");
            notifyService.save(notify_client);
            Notify notify_host = new Notify();
            notify_host.setBill(bill.get());
            notify_host.setDate_notify(LocalDate.now());
            notify_host.setAccount(bill.get().getHomestay().getAccount());
            notify_host.setHomestay(bill.get().getHomestay());
            notify_host.setContent("Bạn đã hủy đăng ký thuê Homestay " + bill.get().getHomestay().getName() + " của khách hàng "+bill.get().getAccount().getName());
            notifyService.save(notify_host);
            return new ResponseEntity<>(bill, HttpStatus.OK);
        }
        return new ResponseEntity<>(bill, HttpStatus.ACCEPTED);
    }

    @PostMapping("/homestay-check-in")
    private ResponseEntity<?> HomestayCheckIn(@RequestBody long id){
        Optional<Bill> bill = billService.findById(id);
        if (bill.isPresent()){
            bill.get().setId(id);
            bill.get().setStatus_homestay(statusHomestayService.findById(3L).get());
            billService.save(bill.get());
            Notify notify_client = new Notify();
            notify_client.setBill(bill.get());
            notify_client.setDate_notify(LocalDate.now());
            notify_client.setAccount(bill.get().getAccount());
            notify_client.setHomestay(bill.get().getHomestay());
            notify_client.setContent("Bạn đã xác nhận nhận Homestay "+bill.get().getHomestay().getName());
            notifyService.save(notify_client);
            Notify notify_host = new Notify();
            notify_host.setBill(bill.get());
            notify_host.setDate_notify(LocalDate.now());
            notify_host.setAccount(bill.get().getHomestay().getAccount());
            notify_host.setHomestay(bill.get().getHomestay());
            notify_host.setContent("" + bill.get().getAccount().getName() + " đã nhận phòng ở Homestay "+ bill.get().getHomestay().getName());
            notifyService.save(notify_host);
            return new ResponseEntity<>(bill, HttpStatus.OK);
        }
        return new ResponseEntity<>(bill, HttpStatus.ACCEPTED);
    }

    @PostMapping("/homestay-check-out")
    private ResponseEntity<?> homestayCheckOut(@RequestBody long id){
        Optional<Bill> bill = billService.findById(id);
        if (bill.isPresent()){
            bill.get().setId(id);
            bill.get().setStatus_homestay(statusHomestayService.findById(4L).get());
            billService.save(bill.get());
            Notify notify_client = new Notify();
            notify_client.setBill(bill.get());
            notify_client.setDate_notify(LocalDate.now());
            notify_client.setAccount(bill.get().getAccount());
            notify_client.setHomestay(bill.get().getHomestay());
            notify_client.setContent("Bạn đã xác nhận trả Homestay "+bill.get().getHomestay().getName());
            notifyService.save(notify_client);
            Notify notify_host = new Notify();
            notify_host.setBill(bill.get());
            notify_host.setDate_notify(LocalDate.now());
            notify_host.setAccount(bill.get().getHomestay().getAccount());
            notify_host.setHomestay(bill.get().getHomestay());
            notify_host.setContent("" + bill.get().getAccount().getName() + " đã trả phòng ở Homestay "+ bill.get().getHomestay().getName());
            notifyService.save(notify_host);
            return new ResponseEntity<>(bill, HttpStatus.OK);
        }
        return new ResponseEntity<>(bill, HttpStatus.ACCEPTED);
    }

    @PostMapping("/cancelling-invoice-host-auto")
    private ResponseEntity<?> cancellingInvoiceHostAuto(@RequestBody long id){
        Optional<Bill> bill = billService.findById(id);
        if (bill.isPresent()){
            bill.get().setId(id);
            bill.get().setStatus_homestay(statusHomestayService.findById(5L).get());
            billService.save(bill.get());
            Notify notify_client = new Notify();
            notify_client.setBill(bill.get());
            notify_client.setDate_notify(LocalDate.now());
            notify_client.setAccount(bill.get().getAccount());
            notify_client.setHomestay(bill.get().getHomestay());
            notify_client.setContent("Chủ Homestay "+bill.get().getHomestay().getName()+" đã hủy đăng ký thuê Homestay (quá thời gian đăng ký)");
            notifyService.save(notify_client);
            Notify notify_host = new Notify();
            notify_host.setBill(bill.get());
            notify_host.setDate_notify(LocalDate.now());
            notify_host.setAccount(bill.get().getHomestay().getAccount());
            notify_host.setHomestay(bill.get().getHomestay());
            notify_host.setContent("Bạn đã tự động hủy đăng ký thuê Homestay " + bill.get().getHomestay().getName() + " của khách hàng " + bill.get().getAccount().getName() + " (quá thời gian đăng ký)");
            notifyService.save(notify_host);
            return new ResponseEntity<>(bill, HttpStatus.OK);
        }
        return new ResponseEntity<>(bill, HttpStatus.ACCEPTED);
    }

    @PostMapping("/homestay-check-out-auto")
    private ResponseEntity<?> homestayCheckOutAuto(@RequestBody long id){
        Optional<Bill> bill = billService.findById(id);
        if (bill.isPresent()){
            bill.get().setId(id);
            bill.get().setStatus_homestay(statusHomestayService.findById(4L).get());
            billService.save(bill.get());
            Notify notify_client = new Notify();
            notify_client.setBill(bill.get());
            notify_client.setDate_notify(LocalDate.now());
            notify_client.setAccount(bill.get().getAccount());
            notify_client.setHomestay(bill.get().getHomestay());
            notify_client.setContent("Bạn đã xác nhận trả Homestay "+bill.get().getHomestay().getName() + " (quá thời gian gửi phòng)");
            notifyService.save(notify_client);
            Notify notify_host = new Notify();
            notify_host.setBill(bill.get());
            notify_host.setDate_notify(LocalDate.now());
            notify_host.setAccount(bill.get().getHomestay().getAccount());
            notify_host.setHomestay(bill.get().getHomestay());
            notify_host.setContent("Bạn đã tự động xác nhận trả phòng ở Homestay " + bill.get().getHomestay().getName() + " của khách hàng "+ bill.get().getAccount().getName()+ " (quá thời gian gửi phòng)");
            notifyService.save(notify_host);
            return new ResponseEntity<>(bill, HttpStatus.OK);
        }
        return new ResponseEntity<>(bill, HttpStatus.ACCEPTED);
    }

    @GetMapping("/find-bill/{id}")
    private ResponseEntity<?> getFindBill(@PathVariable long id){
        Optional<Bill> bill = billService.findById(id);
        return new ResponseEntity<>(bill, HttpStatus.OK);
    }
}
