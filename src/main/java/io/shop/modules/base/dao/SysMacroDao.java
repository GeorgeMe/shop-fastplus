package io.shop.modules.base.dao;

import io.shop.common.base.BaseDao;
import io.shop.modules.base.entity.SysMacroEntity;
import org.apache.ibatis.annotations.Mapper;

/**
 * 通用字典表
 * 
 * @author George
 * @email 2374252444@qq.com
 * @date 2017-10-05 00:42:17
 */
@Mapper
public interface SysMacroDao extends BaseDao<SysMacroEntity> {
	
}
