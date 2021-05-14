$(document).ready(function(){
    // Função para ler dados da tabela
    function showdata() {

        $.ajax({
            url: '/read',
            method: 'GET',
            dataType: 'json',
            success: function(data) {
                $('#tbody').empty();
                if (data.length > 0) {
                    for (var i = 0; i < data.length; i++) {
                        $('#tbody').append(`
                            <tr>
                                <td>${data[i].id}</td>
                                <td>${data[i].name}</td>
                                <td>${data[i].email}</td>
                                <td>${data[i].password}</td>
                                <td>
                                    <button type="button" class="btn btn-warning btn-sm btn-edit" id_edit="${data[i].id}">Edit</button>
                                    <button type="button" class="btn btn-danger btn-sm btn-del" id_del="${data[i].id}">Delete</button>
                                </td>
                            </tr>
                        `);
                    }
                } else {
                    $('#tbody').append(`
                        <tr>
                            <td colspan=5 class="text-danger">No students to show!!</td>
                        </tr>
                    `);
                }
            }
        });
    }
    showdata();

    $('#btnAdd').click(function(e) {
        e.preventDefault();

        let name = $('#name').val();
        let email = $('#email').val();
        let password = $('#password').val();

        let mydata = { name: name, email: email, password: password };

        $.ajax({
            url: '/add',
            method: 'POST',
            data: mydata,
            success: function(res) {
                msg = '<div class="alert alert-dark mt-3">' + res + '</div>';
                $('#msg').html(msg);
                $('#myform')[0].reset();
                showdata();
            },
            error: function(res) {
                console.log(res);
            }
        });
    });

    $('#tbody').on('click', '.btn-del', function() {
        let id = $(this).attr("id_del");
        console.log('Deleted id: ' + id);
        let data = { id: id };

        $.ajax({
            url: '/delete',
            method: 'POST',
            data: data,
            success: function(res) {
                msg = '<div class="alert alert-dark mt-3">' + res + '</div>';
                $('#msg').html(msg);
                showdata();
            },
            error: function (err) {
                console.log(err);
            }
        });
    });

    $('#tbody').on('click', '.btn-edit', function() {
        let id = $(this).attr("id_edit");
        console.log('Edit id: ' + id);
        let mydata = { id: id };

        $.ajax({
            url: '/edit',
            method: 'POST',
            dataType: 'json',
            data: mydata,
            success: function(res) {
                $('#name').val(res[0].name);
                $('#email').val(res[0].email);
                $('#password').val(res[0].password);
            },
            error: function (err) {
                console.log(err);
            }
        });
    });
});
