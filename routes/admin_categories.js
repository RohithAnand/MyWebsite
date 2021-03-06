var express = require('express');
var router = express.Router();
var auth=require('../config/auth');
var isAdmin=auth.isAdmin;
var Category=require('../models/category');


var expressValidator = require('express-validator');
router.use(expressValidator())


router.get('/', isAdmin, function (req,res) {
    
        Category.find(function(err, categories){
            if (err)
                return console.log(err);
            res.render('admin/categories',{
                categories:categories
            });
    });
});

router.get('/add-category', isAdmin, function(req,res){

    var title = "";

    res.render('admin/add_category',{
        title:title
    });
});

router.post('/add-category', function(req,res){

    req.checkBody('title', 'Title must have a value.').notEmpty();

    var title = req.body.title;
    var slug = title.replace(/\s+/g, '-').toLowerCase();
    
    var errors = req.validationErrors();

    if(errors) {
        res.render('admin/add_category',{
            errors: errors,
            title:title
        });
    } 
    else {
        Category.findOne({slug: slug}, function(err, category){
            if(category) {
                req.flash('danger','Category title exists,choose another');
                res.render('admin/add_category',{
                    title:title
                });
            } else {
                var category = new Category({
                    title:title,
                    slug:slug
                });

                category.save(function (err) {
                    if(err)
                        return console.log(error);

                    Category.find(function(err,categories){
                        if (err)
                            console.log(err);
                        else {
                            req.app.locals.categories=categories;
                        }
                    });

                    req.flash('success', 'Category added');
                    res.redirect('/admin/categories');
                });
            }
    });
}
});

router.get('/edit-category/:id', isAdmin, function(req,res){

    Category.findById(req.params.id, function(err, category){
        if(err)
            return console.log(error);
    res.render('admin/edit_category',{
        title:category.title,
        id: category._id
    });
});
});

router.post('/edit-category/:id', function(req,res){

    req.checkBody('title', 'Title must have a value.').notEmpty();

    var title = req.body.title;
    var slug = title.replace(/\s+/g, '-').toLowerCase();
    var id = req.params.id;

    var errors = req.validationErrors();

    if(errors) {
        res.render('admin/category',{
            errors: errors,
            title:title,
            id: id
        });
    } 
    else {
        Category.findOne({slug: slug, _id:{'$ne':id}}, function(err, category){
            if(category) {
                req.flash('danger','Category title exists,choose another');
                res.render('admin/edit_category',{
                    title:title,
                    id: id
                });
            } else {
                Category.findById(id, function(err, category){
                    if (err)
                        return console.log(err);
                    category.title= title;
                    category.slug= slug;

                    category.save(function (err) {
                        if(err)
                            return console.log(error);

                        Category.find(function(err,categories){
                            if (err)
                                console.log(err);
                            else {
                                req.app.locals.categories=categories;
                            }
                        });

                        req.flash('success', 'Successfully Edited');
                        res.redirect('/admin/categories/');
                    });
                })
                
            }
    });
}
});

router.get('/delete-category/:id', isAdmin, function (req,res) {
    Category.findByIdAndRemove(req.params.id, function(err){
        if (err) 
            return console.log(err);

        Category.find(function(err,categories){
            if (err)
                console.log(err);
            else {
                req.app.locals.categories=categories;
            }
        });

        req.flash('success', 'Successfully deleted');
        res.redirect('/admin/categories/');    
    });
});

module.exports = router;