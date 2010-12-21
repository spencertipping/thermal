// Thermal page driver | Spencer Tipping
// Licensed under the terms of the MIT source code license

$(caterwaul.clone('std continuation seq montenegro')(function () {
  $('body').append(html[div > div.toolbar(button.new_story > 'New story') > div.left_column(h1('Progress'), div.all_stories) > div.right_column(h1('Comments'), div.all_comments)]);

  var story = {} /se[_.create(o)     = caterwaul.util.merge({}, o || {}) /se[_.id       = caterwaul.gensym(),
                                                                             _.name     = _.name     || prompt('Please enter a name for the new story.'),
                                                                             _.comments = _.comments || [],
                                                                             _.initials = _.initials || me.initials],

                     _.small_view(o) = html[div.story   %is(o) > span.name(o.name) > span.initials(o.initials) > span.status(o.status) > span.energy(o.energy) > a.arrow('>>')],
                     _.comment(o)    = html[div.comment %is(o) > span.author(o.author) > span.text(o.text)],
                     _.comments(o)   = html[div.comments > div.list(seq[~o.comments *+story.comment]) > div.new_comment(textarea, button('Post'))],

                     _.json(ui)      = let[field(f) = {} /se[_[f] = ui.find('.#{f}').text()]] in
                                       caterwaul.util.merge({id: ui.attr('id')}, seq[~'name initials status energy'.split(/\s/) *+field /+caterwaul.util.merge],
                                                                                 {comments: seq[~ui.find('.comment') *[{author: _.find('.author').text(), text: _.find('.text').text()}]]}),
                     _.save(ui)      = story.json(ui) /se[rpc.story(_.id, _)],
                     _.load(ui)      = rpc.story(ui.attr('id'), _) /cps[ui.replaceWith(story.small_view(_))],

                     where[is(x)(e) = e.data('original', x).attr('id', x.id)]];

  var active_story = null;
  $('.story .arrow')      .live('click', _) /cps[active_story = $('.all-comments').empty().append(story.comments($(this).up('.story').data('original')))];
  $('.new-story')         .live('click', _) /cps[$('.all-stories').append(story.small_view(story.create()) /se[story.save(_)])];
  $('.new-comment button').live('click', _) /cps[$(this) /se[_.nearest('.list').append(story.comment({author: me.name, text: _.nearest('textarea').val()})),
                                                             _.nearest('textarea').val(''),
                                                             story.save(active_story)]];

// Identity.
// There isn't any authentication or security for this application. The user just provides a name and the initials are inferred.

  var me = {name: 'User Name', initials: 'UN'};

// RPC setup.
// These functions are CPS-converted interfaces to the server database.

  var rpc = caterwaul.montenegro.rpc /re[{stories: _('/stories'), story: _('/story')}];

// Story loader.

  let/cps[stories <- rpc.stories(_), name <- seq[~stories %s[s] *!+_], s <- rpc.story(name, _)]
         [$('.all-stories').append(story.small_view(s))]}));

// Generated by SDoc 
